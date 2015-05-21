/** @jsx React.DOM */
var React = require('react');
var AuthClient = require('../../firebaseAuth.js');

var Logout = 
  React.createClass({
    handleLogout:function() {
      AuthClient.logout();
    },
    render:function() {
      return (
        <button className="Button" onClick={this.handleLogout}>Logout</button>
      )
    }
});

module.exports = Logout;