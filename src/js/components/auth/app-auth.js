/** @jsx React.DOM */
var React = require('react');
var Login = require('./app-login.js');
var Register = require('./app-register.js');
var UserActions = require('../../actions/user-actions.js');
var UserStore = require('../../stores/user-store.js');
var Notification = require('../app-notification.js');

var Auth = React.createClass({
  getInitialState:function(){
    return {
      toggle: true,
      validationMessages: [],
      loading: false
    }
  },
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      validationMessages: UserStore.getValidationMessages()
    });

    // Hide loader if we get messages in return else log in
    if(this.state.validationMessages.length > 0) {
      this.setState({loading: false});
    }
  },

  reset: function() {
    this.setState({
      loading: true,
      validationMessages: []
    });
  },

  handleLogin:function(email, password) {
    this.reset();
    UserActions.loginUser(email, password);
  },

  handleRegister:function(email, password) {
    this.reset();
    UserActions.registerUser(email, password);
  },

  toggle:function() {
    this.setState({
      toggle: !this.state.toggle,
      validationMessages: []
    });
  },

  render:function(){
    validationMessages = null;
    if(this.state.validationMessages.length > 0) {
      validationMessages = this.state.validationMessages.map(function(value, i) {
        return <Notification key={i} message={value} type={'error'} />
      });
    }
    return (
      <div className="Auth">
        <div>
          <button className="Button" onClick={this.toggle}>Login</button>
          <button className="Button" onClick={this.toggle}>Register</button>
          {this.state.toggle ? <Login handleLogin={this.handleLogin} /> : <Register handleRegister={this.handleRegister} />}
          {validationMessages}
          {this.state.loading ? 'ladda' : null}
        </div>
      </div>
    )
  }
});

module.exports = Auth;