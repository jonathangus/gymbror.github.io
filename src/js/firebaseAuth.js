var firebaseConnection = require('./firebaseConnection.js');

var authClient = new FirebaseSimpleLogin(firebaseConnection, function(error, user) {
  if (error) {
    console.log('Authentication error: ', error);
  } else if (user) {
    console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');
  } else {
    console.log("User is logged2 out.")
  }
});

module.exports = authClient;