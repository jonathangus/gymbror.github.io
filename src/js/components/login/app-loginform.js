/** @jsx React.DOM */
var React = require('react');

var LoginForm = 
  React.createClass({
    onAuth:function() {
      this.props.onAuth('aaada a');
    },
    render:function() {
      return (
        <div>
          <input />
          <input />
          <button onClick={this.onAuth}>submit</button>
        </div>
      )
    }
});

module.exports = LoginForm;