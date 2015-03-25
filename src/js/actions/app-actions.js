var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  addWorkout:function(name, sets){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM,
      name: name,
      sets: sets
    })
  },
  removeWorkout:function(name, key){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_ITEM,
      name: name,
      key: key
    })
  },
  registerUser: function(email, password) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REGISTER_USER,
      email: email,
      password: password
    });
  },
}

module.exports = AppActions;