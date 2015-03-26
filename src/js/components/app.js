/** @jsx React.DOM */
var React = require('react');
var UserStore = require('../stores/UserStore.js');
var Auth = require('./auth/app-auth.js');
var Logout = require('./auth/logout.js');
var Loader = require('./app-loader.js');
var Exercises = require('./exercises/Exercises.js');

var APP =
  React.createClass({
    getInitialState:function(){
      return {
        loading: true,
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
      this.setState({
        loggedIn: UserStore.isLoggedIn(), 
        loading: false
      });
    },

    render:function(){
      return (
        <div className="container">
          {this.state.loggedIn ? <Logout /> : null }
          {!this.state.loggedIn ? <Auth /> : <Exercises user={UserStore.getUser()} />}
          <Loader show={this.state.loading} />
        </div>
      )
    }
  });
module.exports = APP;