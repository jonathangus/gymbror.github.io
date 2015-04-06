var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var ExercisesConstants = require('../constants/exercises-constants.js');
var firebaseConnection = require('../firebaseConnection.js');
var UserStore = require('./user-store.js');
var Promise = require('es6-promise').Promise;
var Firebase = require('firebase');

var CHANGE_EVENT = 'change';

var user;
var _exercises;
var ref;
var _lastWorkout;

var ExerciseStore = merge(EventEmitter.prototype, {
  init: function() {
    user = UserStore.getUser();
  },

  fetchExercises: function(user) {
    firebaseConnection.child('users/' + user.id + '/exercises').on('value', function(snapshot) {
      _exercises = snapshot.val();
      ExerciseStore.emitChange();
    }); 
  },

  addExercise: function(name) {
    firebaseConnection.child('users/' + user.id + '/exercises').push({name: name});
  },

  removeExercise: function(id) {
    console.log(id);
    user = UserStore.getUser();
    firebaseConnection.child('users/' + user.id + '/exercises/' + id).remove();
  },

  addWorkout: function(workout, id) {
    firebaseConnection.child('users/' + user.id + '/exercises/' + id + '/workouts').push(workout);
    this.emitChange();
  },

  removeWorkout: function(exerciseID, workoutID) {
    firebaseConnection.child('users/' + user.id + '/exercises/' + exerciseID + '/workouts/' + workoutID).remove();
    this.emitChange();
  },

  getExercises: function() {
    return _exercises;
  },

  setLastWorkout: function(id) {
    firebaseConnection.child('users/' + user.id + '/exercises/' + id + '/workouts').orderByChild('date').limit(1).on('value', function(snapshot) {
      _lastWorkout = snapshot.val();
      ExerciseStore.emitChange();
    });
  },

  getLastWorkout: function() {
    return _lastWorkout;
  },

  getSortedWorkouts: function(id) {
    user = UserStore.getUser();

    return new Promise(
      function(resolve, reject) {
        var ref = new Firebase('https://gymbror.firebaseio.com/users/' + user.id + '/exercises/' + id + '/workouts');
        ref.orderByChild('summary').on('value', function(snapshot) {
          resolve(snapshot.val());
      });    
    });

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
    case ExercisesConstants.FETCH_EXERCISES:
      ExerciseStore.fetchExercises(action.user);
      break;

    case ExercisesConstants.ADD_EXERCISE:
      ExerciseStore.addExercise(action.name);
      ExerciseStore.emitChange();
      break;

    case ExercisesConstants.REMOVE_EXERCISE:
      ExerciseStore.removeExercise(action.id);
      ExerciseStore.emitChange();
      break;

    case ExercisesConstants.ADD_WORKOUT:
      ExerciseStore.addWorkout(action.workout, action.id);
      ExerciseStore.emitChange();
      break;

    case ExercisesConstants.REMOVE_WORKOUT:
      ExerciseStore.removeWorkout(action.exerciseID, action.workoutID);
      ExerciseStore.emitChange();
      break;



    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = ExerciseStore;