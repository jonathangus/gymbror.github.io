var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var AppConstants = require('../constants/app-constants.js');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var Firebase = require('firebase');

var CHANGE_EVENT = "change";

var _exercises = [];

_exercises[1] = {
  'name': 'Marklyft',
  'sets': [
    [50, 50, 50, 55, 55],
    [55, 55, 55, 60, 60]
  ]
}


_exercises[2] = {
  'name': 'Benpress',
  'sets': [
    [50, 50, 50],
    [55, 55, 55]
  ]
}

// var ref = new Firebase('https://gymbror.firebaseio.com/exercises');
// ref.on("value", function(snapshot) {
//   console.log(snapshot.val());
// });

function _addWorkout(name, sets) {
  _exercises.forEach(function(value) {
    if(value.name == name) {
      value.sets.push(sets);
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
        _removeItem(payload.action.index);
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