/** @jsx React.DOM */
var React = require('react');

var RegisterForm = 
  React.createClass({
    onAuth:function() {
      this.props.onAuth('aaada a');
    },
    tryLogin:function(e) {
      e.preventDefault();
    },
    render:function() {
      return (
        <form className="Login-container" onSubmit={this.tryLogin}>
          <input placeholder="Username" className="u-easy-bottom" />
          <input placeholder="Password" type="password" className="u-easy-bottom" />
          <button type="submit" className="Button" onClick={this.onAuth}>submit</button>
        </form>
      )
    }
});

module.exports = RegisterForm;