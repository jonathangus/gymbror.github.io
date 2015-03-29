var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var UserConstants = require('../constants/user-constants.js');

var UserActions = {
  updateUserStatus: function(status) {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_STATUS,
      status: status
    });
  },
  loginUser: function(email, password) {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_LOGIN,
      email: email,
      password: password
    });
  },
  registerUser: function(email, password) {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_REGISTER,
      email: email,
      password: password
    });
  }
}

module.exports = UserActions;