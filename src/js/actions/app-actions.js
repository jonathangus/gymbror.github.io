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
}

module.exports = AppActions;