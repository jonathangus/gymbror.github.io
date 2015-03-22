/** @jsx React.DOM */
var React = require('react');
var LoginForm = require('./app-loginform.js');
var Firebase = require('firebase');
var FirebaseSimpleLogin = require('../../firebase-simple-login.js');

function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
  }
}

var Login = 
  React.createClass({
    getInitialState:function(){
      return {
        show: true
      }
    },
    showLogin:function() {
      this.setState({show: !this.state.show});
    },
    handleLogin:function(bree) {


    },
    componentWillMount:function(){
      var ref = new Firebase('https://gymbror.firebaseio.com/');
      var auth = new FirebaseSimpleLogin(ref, function(error, user) {
        if (error) {
          console.log('Authentication error: ', error);
        } else if (user) {
          console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');
        } else {
          console.log("User is logged2 out.")
        }
      });
    },
    render:function() {
      return (
        <div className="Login">
          <button onClick={this.showLogin}>Login</button>
          { this.state.show ? <LoginForm onAuth={this.handleLogin} /> : null }
        </div>
      )
    }
});

module.exports = Login;