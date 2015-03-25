/** @jsx React.DOM */
var React = require('react');
var Login = require('./app-login.js');
var Register = require('./app-register.js');
var AppStore = require('../../stores/app-store.js');

var Auth = React.createClass({
  getInitialState:function(){
    return {
      toggle: false 
    }
  },
  toggle:function() {
    this.setState({toggle: !this.state.toggle});
  },
  handleLogin:function(email, password) {
    AppStore.loginUser(email, password);
  },
  onRegistred:function() {
    this.toggle();
  },
  render:function(){
    return (
      <div className="Auth">
        <button className="Button" onClick={this.toggle}>Login</button>
        <button className="Button" onClick={this.toggle}>Register</button>
        { this.state.toggle ? <Login handleLogin={this.handleLogin} /> : <Register onSuccess={this.onRegistred} />}
      </div>
    )
  }
});

module.exports = Auth;