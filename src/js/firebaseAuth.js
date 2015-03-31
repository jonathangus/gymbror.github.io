var firebaseConnection = require('./firebaseConnection.js');
var FirebaseSimpleLogin = require('./firebase-simple-login.js');
var UserActions = require('./actions/user-actions.js');
var UserStore = require('./stores/user-store.js');
var ExerciseActions = require('./actions/exercises-actions.js');

var authClient = new FirebaseSimpleLogin(firebaseConnection, function(error, user) {
  UserStore = require('./stores/user-store.js');
  if (error) {
    UserStore.setValidationMessages(error.message);
  } else if (user) {
    UserStore.setUser(user);
    UserActions.updateUserStatus(true);
    ExerciseActions.fetchExercises(user);
  } else {
    UserActions.updateUserStatus(false);
  }
});

module.exports = authClient;