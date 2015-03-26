/** @jsx React.DOM */
var React = require('react');
var AuthClient = require('../../firebaseAuth.js');
var Logout = require('../auth/logout.js');
var UserStore = require('../../stores/UserStore.js');
var Auth = require('../auth/app-auth.js');

var Header = React.createClass({
  getInitialState:function(){
    return {
      loggedIn: false
    }
  },
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    setState({loggedIn: UserStore.isLoggedIn() })
  },
  render:function() {
    console.log(this.state.loggedIn);
    return (
      <Logout />
    )
  }
});

module.exports = Header;