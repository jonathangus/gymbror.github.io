var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var YoConstants = require('../constants/user-constants.js');
var merge = require('react/lib/merge');
var AppConstants = require('../constants/app-constants.js');
var authClient = require('../firebaseAuth.js');
var firebaseConnection = require('../firebaseConnection');
var CHANGE_EVENT = 'change';


var RegisterUserStore = merge(EventEmitter.prototype, {

  getNewPersonName: function() {
    return newPersonsName;
  },

  getValidationMessages: function() {
    return validationMessages;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
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

var authenticatedUser;

var _registerValidation = function(email, password) {
  if(email.length < 4) {
    validationMessages.push({
      'message': 'Email to short',
      'type': 'error'
    });
  }
  if(password.length < 1) {
    validationMessages.push({
      'message': 'Password to short',
      'type': 'error'
    });
  }

  if(validationMessages.length < 1) { return true }
  return false
}

var _registerUser = function(email, password) {
  var $this = this;
  validationMessages = [];

  if(!_registerValidation(email, password)) {
    RegisterUserStore.emitChange();
    return;
  }

  authClient.createUser(email, password, function (error, user) {
    if (!error) {

      authClient.login('password', {
        email: email,
        password: password
      });
      validationMessages.push({
        'message': 'User have been registred',
        'type': 'success'
      });

    } else {
      validationMessages.push({
        'message': error,
        'type': 'error'
      });
    }

    RegisterUserStore.emitChange();
  });

};

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case AppConstants.REGISTER_USER:
      _registerUser(action.email, action.password);
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = RegisterUserStore;