var firebaseConnection = require('./firebaseConnection.js');
var FirebaseSimpleLogin = require('./firebase-simple-login.js');
var UserActions = require('./actions/user-actions.js');
var UserStore = require('./stores/UserStore.js');

var authClient = new FirebaseSimpleLogin(firebaseConnection, function(error, user) {
  if (error) {
    UserStore.setMessages(error);
  } else if (user) {
    UserStore.setUser(user);
    UserActions.updateUserStatus(true);
  } else {
    UserActions.updateUserStatus(false);
  }
});

module.exports = authClient;