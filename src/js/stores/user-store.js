var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/user-constants.js');
var assign = require('object-assign');
var authClient = require('../firebaseAuth.js');

var CHANGE_EVENT = 'change';

var _loggedIn = false;
var _currentUser = null;
var _validationMessages = [];

var UserStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  isLoggedIn: function() {
    return _loggedIn;
  },

  setUser: function(user) {
    _currentUser = user;
  },

  getUser: function() {
    if(_currentUser) {
      return _currentUser;
    }

    return false;
  },

  loginUser: function(email, password) {
    authClient.login('password', {
      email: email,
      password: password,
      rememberMe: true
    });
  },

  registerUser: function(email, password) {
    authClient.createUser(email, password, function (error, user) {
      if(!error) {
        UserStore.loginUser(email, password);
        swal("Register successful", "You will be logged in", "success");
      } 
      else {
        UserStore.setValidationMessages(error.message);
      }
    });

  },

  getValidationMessages:function() {
    return _validationMessages;
  },

  setValidationMessages:function(message) {
    _validationMessages = [];
    _validationMessages.push(message);
    this.emitChange();
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case UserConstants.USER_STATUS:
      _loggedIn = action.status;
      UserStore.emitChange();
      break;

    case UserConstants.USER_LOGIN:
      UserStore.loginUser(action.email, action.password);
      UserStore.emitChange();
      break;

    case UserConstants.USER_REGISTER:
      UserStore.registerUser(action.email, action.password);
      UserStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = UserStore;