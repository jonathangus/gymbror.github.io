/** @jsx React.DOM */
var React = require('react');
var RegisterUserStore = require('../../stores/RegisterUserStore.js');
var AppActions = require('../../actions/app-actions.js');
var Notification = require('../app-notification.js');

var getState = function() {
  return {
    validationMessages: RegisterUserStore.getValidationMessages(),
  };
};

var Register = 
  React.createClass({
    getInitialState : function() {
      return {
        validationMessages : []
      };
    },
    componentDidMount: function() {
      RegisterUserStore.addChangeListener(this._onChange);
      this.refs.email.getDOMNode().focus();
    },
    componentWillUnmount: function() {
      RegisterUserStore.removeChangeListener(this._onChange);
    },
    _onChange: function() {
      this.setState(getState());
    },
    handleRegister:function(e) {
      e.preventDefault();
      this.setState({validationMessages: []});
      var email = this.refs.email.getDOMNode().value;
      var password = this.refs.password.getDOMNode().value;
      AppActions.registerUser(email, password);
      console.log(this.props.onSuccess());
    },
    render:function() {
      var validationMessages = '';
      if(this.state.validationMessages.length > 0) {
        validationMessages = this.state.validationMessages.map(function(value, i) {
          return <Notification key={i} message={value.message} type={value.type} />
        });
      }
      return (
        <div>
          <h2>Register</h2>
          {validationMessages}
          <form onSubmit={this.handleRegister} className="Register">
            <input ref="email" placeholder="Email" className="u-easy-bottom" />
            <input ref="password" placeholder="Password" type="password" className="u-easy-bottom" />
            <button type="submit" className="Button">Submit</button>
          </form>
        </div>
      )
    }
});

module.exports = Register;