var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var ExercisesConstants = require('../constants/exercises-constants.js');
var firebaseConnection = require('../firebaseConnection.js');
var UserStore = require('./user-store.js');

var CHANGE_EVENT = 'change';

var user;
var _exercises;
var ref;
var _lastWorkout;

var ExerciseStore = merge(EventEmitter.prototype, {
  init: function() {
    user = UserStore.getUser();
    ref = firebaseConnection.child('users/' + user.id);
    ref.child('exercises').on('value', function(snapshot) {
      _exercises = snapshot.val();
      ExerciseStore.emitChange();
    });
  },

  addExercise: function(name) {
    ref.child('exercises').push({name: name});
  },

  removeWorkout: function(id) {
    ref.child('exercises/' + id).remove();
  },

  addWorkout: function(workout, id) {
    ref.child('exercises/' + id + '/workouts').push(workout);
    this.emitChange();
  },

  getExercises: function() {
    return _exercises;
  },

  setLastWorkout: function(id) {
    ref.child('exercises/' + id + '/workouts').orderByChild('date').limit(1).on('value', function(snapshot) {
      _lastWorkout = snapshot.val();
      ExerciseStore.emitChange();
    });
  },

  getLastWorkout: function() {
    return _lastWorkout;
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

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case ExercisesConstants.ADD_EXERCISE:
      ExerciseStore.addExercise(action.name);
      ExerciseStore.emitChange();
      break;

    case ExercisesConstants.REMOVE_EXERCISE:
      ExerciseStore.removeWorkout(action.id);
      ExerciseStore.emitChange();
      break;

    case ExercisesConstants.ADD_WORKOUT:
      ExerciseStore.addWorkout(action.workout, action.id);
      ExerciseStore.emitChange();
      break;

    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = ExerciseStore;