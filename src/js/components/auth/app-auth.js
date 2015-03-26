/** @jsx React.DOM */
var React = require('react');
var Login = require('./app-login.js');
var Register = require('./app-register.js');
var UserActions = require('../../actions/user-actions.js');
var UserStore = require('../../stores/UserStore.js');

var Auth = React.createClass({
  getInitialState:function(){
    return {
      toggle: true
    }
  },
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    console.log(UserStore.getMessages())
  },
  handleLogin:function(email, password) {
    UserActions.loginUser(email, password);
  },
  toggle:function() {
    this.setState({toggle: !this.state.toggle});
  },
  render:function(){
    return (
      <div className="Auth">
        <div>
          <button className="Button" onClick={this.toggle}>Login</button>
          <button className="Button" onClick={this.toggle}>Register</button>
          { this.state.toggle ? <Login handleLogin={this.handleLogin} /> : <Register onSuccess={this.onRegistred} />}
        </div>
      </div>
    )
  }
});

module.exports = Auth;