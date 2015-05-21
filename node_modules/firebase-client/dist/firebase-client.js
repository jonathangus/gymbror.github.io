(function() {
  var FirebaseClient;

  FirebaseClient = (function() {
    var FirebaseRequest, FirebaseResponse;

    FirebaseRequest = require("./firebase-request");

    FirebaseResponse = require("./firebase-response");

    function FirebaseClient(config) {
      if (typeof config.url !== "string") {
        throw new Error("url must be defined");
      }
      config.url = this.formatUrl(config.url);
      this.request = new FirebaseRequest(config, FirebaseResponse);
    }

    FirebaseClient.prototype.set = function(path, data, query) {
      if (data == null) {
        data = {};
      }
      if (query == null) {
        query = {};
      }
      return this.request.put(path, data);
    };

    FirebaseClient.prototype.get = function(path, query) {
      if (query == null) {
        query = {};
      }
      return this.request.get(path, query);
    };

    FirebaseClient.prototype.push = function(path, data, query) {
      if (data == null) {
        data = {};
      }
      if (query == null) {
        query = {};
      }
      return this.request.post(path, data, query);
    };

    FirebaseClient.prototype["delete"] = function(path, query) {
      if (query == null) {
        query = {};
      }
      return this.request["delete"](path, query);
    };

    FirebaseClient.prototype.update = function(path, data) {
      return this.request.patch(path, data);
    };

    FirebaseClient.prototype.formatUrl = function(url) {
      if (url == null) {
        url = "";
      }
      if (url[url.length - 1] !== "/") {
        url = "" + url + "/";
      }
      return url;
    };

    return FirebaseClient;

  })();

  module.exports = FirebaseClient;

}).call(this);
