var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var AppConstants = require('../constants/app-constants.js');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var Firebase = require('firebase');
var FirebaseSimpleLogin = require('../firebase-simple-login.js');

var CHANGE_EVENT = "change";

function _addWorkout(name, sets) {
  _exercises.forEach(function(value) {
    if(value.name == name) {
      value.sets.push(sets);
    }
  }); 
}

var ref = new Firebase('https://gymbror.firebaseio.com/exercises');

function _removeItem(name, key) {
  ref.child(name + '/sets/' + key).remove();
}

var authClient = new FirebaseSimpleLogin(ref, function(error, user) {
  if (error) {
    console.log('Authentication error: ', error);
  } else if (user) {
    console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');
  } else {
    console.log("User is logged2 out.")
  }
});

function _loginUser(email, password) {
  authClient.login('password', {
    email: email,
    password: password
  });
}

function _registerUser(email, password) {
  authClient.createUser(email, password, function (error, user) {
    if (!error) {
        _loginUser(email, password);
    } else {
        console.log(error);
    }
  });
}

var AppStore = merge(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  getExercises:function() {
    return _exercises;
  },
  loginUser: function(email, password) {
    _loginUser(email, password);
  },
  registerUser: function(email, password) {
    _registerUser(email, password);
  },
  addWorkout:function(name, sets) {
    _addWorkout(name, sets);
  },
  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.ADD_ITEM:
        // _addWorkout(payload.action.name, payload.action.sets);
        var ref = new Firebase('https://gymbror.firebaseio.com/exercises');
        console.log(ref.asArray());
        break;

      case AppConstants.REMOVE_ITEM:
        _removeItem(payload.action.name, payload.action.key);
        break;

      case AppConstants.INCREASE_ITEM:
        _increaseItem(payload.action.index);
        break;

      case AppConstants.DECREASE_ITEM:
        _decreaseItem(payload.action.index);
        break;
    }

    AppStore.emitChange();

    return true;
  })
});

module.exports = AppStore;