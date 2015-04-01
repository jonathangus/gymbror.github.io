var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var ExercisesConstants = require('../constants/exercises-constants.js');

var ExercisesActions = {
  fetchExercises: function(user) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.FETCH_EXERCISES,
      user: user
    });
  },
  addExercise: function(name) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.ADD_EXERCISE,
      name: name
    });
  },
  removeExercise: function(id) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.REMOVE_EXERCISE,
      id: id
    });
  },
  addWorkout: function(workout, id) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.ADD_WORKOUT,
      workout: workout,
      id: id
    });
  },
  removeWorkout: function(exerciseID, workoutID) {
    AppDispatcher.handleViewAction({
      actionType: ExercisesConstants.REMOVE_WORKOUT,
      exerciseID: exerciseID,
      workoutID: workoutID
    });
  }
};

module.exports = ExercisesActions;