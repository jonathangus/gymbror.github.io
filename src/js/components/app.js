/** @jsx React.DOM */
var React = require('react');
var UserStore = require('../stores/user-store.js');
var Auth = require('./auth/app-auth.js');
var Logout = require('./auth/logout.js');
var Loader = require('./app-loader.js');
var Exercises = require('./exercises/exercises.js');

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
          {!this.state.loggedIn ? <div className="App-video"><video muted autoPlay><source src="assets/insp.mp4" type="video/mp4"></source></video></div> : null}
          {this.state.loggedIn ? <Logout /> : null}
          {!this.state.loggedIn ? <Auth /> : <Exercises />}
          <Loader show={this.state.loading} />
        </div>
      )
    }
  });
module.exports = APP;