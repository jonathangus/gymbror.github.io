'use strict';

var util = require('util'),
  Store = require('../base'),
  _ = require('lodash'),
  async = require('async'),
  redis = require('redis'),
  jsondate = require('jsondate'),
  debug = require('debug')('eventstore:store:redis');

function Redis(options) {
  options = options || {};

  Store.call(this, options);

  var defaults = {
    host: 'localhost',
    port: 6379,
    prefix: 'eventstore',
    eventsCollectionName: 'events',
    snapshotsCollectionName: 'snapshots',
    max_attempts: 1
  };

  _.defaults(options, defaults);

  if (options.url) {
    var url = require('url').parse(options.url);
    if (url.protocol === 'redis:') {
      if (url.auth) {
        var userparts = url.auth.split(":");
        options.user = userparts[0];
        if (userparts.length === 2) {
          options.password = userparts[1];
        }
      }
      options.host = url.hostname;
      options.port = url.port;
      if (url.pathname) {
        options.db   = url.pathname.replace("/", "", 1);
      }
    }
  }

  this.options = options;
}

util.inherits(Redis, Store);

// helpers
function handleResultSet (err, res, callback) {
  if (err) {
    debug(err);
    return callback(err);
  }
  
  if (!res || res.length === 0) {
    return callback(null, []);
  }
  var arr = [];

  res.forEach(function(item) {
    arr.push(jsondate.parse(item));
  });

  callback(null, arr);
}

_.extend(Redis.prototype, {

  connect: function (callback) {
    var self = this;

    var options = this.options;

    this.client = new redis.createClient(options.port || options.socket, options.host, options);

    var calledBack = false;

    if (options.password) {
      this.client.auth(options.password, function (err) {
        if (err && !calledBack && callback) {
          calledBack = true;
          if (callback) callback(err, self);
          return;
        }
        
        if (err) {
          debug(err);
        }
      });
    }

    if (options.db) {
      this.client.select(options.db);
    }

    this.client.on('end', function () {
      self.disconnect();
    });

    this.client.on('error', function (err) {
      debug(err);

      if (calledBack) return;
      calledBack = true;
      if (callback) callback(null, self);
    });

    this.client.on('connect', function () {
      if (options.db) {
        self.client.send_anyways = true;
        self.client.select(options.db);
        self.client.send_anyways = false;
      }

      self.emit('connect');

      if (calledBack) return;
      calledBack = true;
      if (callback) callback(null, self);
    });
  },

  disconnect: function (callback) {
    this.client.end();
    this.emit('disconnect');
    if (callback) callback(null, this);
  },

  clear: function (callback) {
    var self = this;
    async.parallel([
      function (callback) {
        self.client.del('nextItemId:' + self.options.prefix, callback);
      },
      function (callback) {
        self.client.keys(self.options.prefix + ':*', function(err, keys) {
          if (err) {
            return callback(err);
          }
          async.each(keys, function (key, callback) {
            self.client.del(key, callback);
          }, callback);
        });
      }
    ], function (err) {
      if (err) {
        debug(err);
      }
      if (callback) callback(err);
    });
  },

  getNewId: function(callback) {
    this.client.incr('nextItemId:' + this.options.prefix, function(err, id) {
      if (err) {
        debug(err);
        return callback(err);
      }
      callback(null, id.toString());
    });
  },

  addEvents: function (events, callback) {
    
    var self = this;
    var noAggId = false;
    
    var keysEvtMap = [];
    var undispKeysEvtMap = [];

    var aggregateId = events[0].aggregateId;
    var aggregate = events[0].aggregate || '_general';
    var context = events[0].context || '_general';

    _.each(events, function (evt) {
      if (!evt.aggregateId) {
        noAggId = true;
      }
      keysEvtMap.push(self.options.prefix + ':' + self.options.eventsCollectionName + ':' + evt.commitStamp.getTime() + evt.commitSequence.toString() + ':' + context + ':' + aggregate + ':' + aggregateId + ':' + evt.id);
      keysEvtMap.push(JSON.stringify(evt));
      undispKeysEvtMap.push(self.options.prefix + ':undispatched_' + self.options.eventsCollectionName + ':' + evt.commitStamp.getTime() + evt.commitSequence.toString() + ':' + context + ':' + aggregate + ':' + aggregateId + ':' + evt.id);
      undispKeysEvtMap.push(JSON.stringify(evt));
    });

    if (noAggId) {
      var errMsg = 'aggregateId not defined!';
      debug(errMsg);
      if (callback) callback(new Error(errMsg));
      return;
    }
    
    if (!events || events.length === 0) {
      return callback(null);
    }
    
    var args = keysEvtMap.concat(undispKeysEvtMap).concat([callback]);
    
    this.client.mset.apply(this.client, args);
  },

  getEvents: function (query, skip, limit, callback) {
    var aggregateId = query.aggregateId || '*';
    var aggregate = query.aggregate || '*';
    var context = query.context || '*';
    
    var self = this;
    
    this.client.keys(this.options.prefix + ':' + this.options.eventsCollectionName + ':*:' + context + ':' + aggregate + ':' + aggregateId + ':*', function (err, keys) {
      if (err) {
        debug(err);
        if (callback) callback(err);
        return;
      }

      keys = _.sortBy(keys, function (s) {
        return s;
      });

      if (limit === -1) {
        keys = keys.slice(skip);
      }
      else {
        keys = keys.slice(skip, skip + limit);
      }
      
      if (keys.length === 0) {
        return callback(null, []);
      }

      var args = keys.concat(function (err, res) {
        handleResultSet(err, res, callback);
      });

      self.client.mget.apply(self.client, args);
    });
  },

  getEventsByRevision: function (query, revMin, revMax, callback) {
    if (!query.aggregateId) {
      var errMsg = 'aggregateId not defined!';
      debug(errMsg);
      if (callback) callback(new Error(errMsg));
      return;
    }

    var aggregateId = query.aggregateId;
    var aggregate = query.aggregate || '*';
    var context = query.context || '*';

    var self = this;

    this.client.keys(this.options.prefix + ':' + this.options.eventsCollectionName + ':*:' + context + ':' + aggregate + ':' + aggregateId + ':*', function (err, keys) {
      if (err) {
        debug(err);
        if (callback) callback(err);
        return;
      }

      keys = _.sortBy(keys, function (s) {
        return s;
      });

      if (revMax === -1) {
        keys = keys.slice(revMin);
      }
      else {
        keys = keys.slice(revMin, revMax);
      }

      if (keys.length === 0) {
        return callback(null, []);
      }

      var args = keys.concat(function (err, res) {
        handleResultSet(err, res, callback);
      });

      self.client.mget.apply(self.client, args);
    });
  },

  getUndispatchedEvents: function (callback) {
    var self = this;
    this.client.keys(this.options.prefix + ':undispatched_' + this.options.eventsCollectionName + ':*:*:*:*:*', function (err, keys) {
      if (err) {
        debug(err);
        if (callback) callback(err);
        return;
      }

      keys = _.sortBy(keys, function (s) {
        return s;
      });

      var args = keys.concat(function (err, res) {
        handleResultSet(err, res, callback);
      });

      self.client.mget.apply(self.client, args);
    });
  },

  setEventToDispatched: function (id, callback) {
    var self = this;
    this.client.keys(this.options.prefix + ':undispatched_' + this.options.eventsCollectionName + ':*:*:*:*:' + id, function (err, keys) {
      if (err) {
        debug(err);
        if (callback) callback(err);
        return;
      }

      keys = _.sortBy(keys, function (s) {
        return s;
      });

      var args = keys.concat(function (err, res) {
        if (callback) callback(err);
      });

      self.client.del.apply(self.client, args);
    });
  },

  addSnapshot: function(snap, callback) {
    if (!snap.aggregateId) {
      var errMsg = 'aggregateId not defined!';
      debug(errMsg);
      if (callback) callback(new Error(errMsg));
      return;
    }

    var aggregateId = snap.aggregateId;
    var aggregate = snap.aggregate || '_general';
    var context = snap.context || '_general';

    this.client.set(this.options.prefix + ':' + this.options.snapshotsCollectionName + ':' + snap.commitStamp.getTime() + ':' + context + ':' + aggregate + ':' + aggregateId + ':' + snap.id, JSON.stringify(snap), function (err) {
      if (callback) callback(err);
    });
  },

  getSnapshot: function (query, revMax, callback) {
    if (!query.aggregateId) {
      var errMsg = 'aggregateId not defined!';
      debug(errMsg);
      if (callback) callback(new Error(errMsg));
      return;
    }
    
    var self = this;

    var aggregateId = query.aggregateId;
    var aggregate = query.aggregate || '*';
    var context = query.context || '*';

    this.client.keys(this.options.prefix + ':' + this.options.snapshotsCollectionName + ':*:' + context + ':' + aggregate + ':' + aggregateId + ':*', function (err, keys) {
      if (err) {
        debug(err);
        if (callback) callback(err);
        return;
      }

      keys = _.sortBy(keys, function (s) {
        return s;
      }).reverse();

      if (revMax > -1) {
        keys = keys.slice(0, revMax);
      }

      if (keys.length === 0) {
        return callback(null, null);
      }
      
      async.map(keys, function (key, callback) {
        self.client.get(key, function (err, res) {
          if (err) {
            return callback(err);
          }

          callback(null, jsondate.parse(res));
        });
      }, function (err, res) {
        if (err) {
          debug(err);
          return callback(err);
        }
        
        var found = _.find(res, function (s) {
          if (revMax > -1 && s.revision > revMax) {
            return false;
          }
          return true;
        });

        callback(null, found);
      });
    });
  }

});

module.exports = Redis;
