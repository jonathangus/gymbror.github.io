/** @jsx React.DOM */
var React = require('react');
var UserStore = require('../stores/user-store.js');
var Logout = require('./auth/logout.js');
var Loader = require('./app-loader.js');
var MainView = require('./main-view.js');
var AnonView = require('./anon-view.js');
var ExercisesStore = require('../stores/exercises-store.js');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var _items = null;

var APP =
  React.createClass({
    mixins:[ReactFireMixin],

    getInitialState:function(){
      return {
        loading: true,
        loggedIn: false,
        exercises: []
      }
    },

    componentDidMount: function() {
      UserStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      var userOn = UserStore.isLoggedIn();
      var _that = this;

      if(!userOn) {
        this.setState({
          loggedIn: false, 
          loading: false
        });
      }
      else {
        var user = UserStore.getUser();

        this.firebaseRef = new Firebase('https://gymbror.firebaseio.com/users/' + user.id + '/exercises');
        this.bindAsObject(this.firebaseRef, 'exercises');

        this.firebaseRef.on('value', function(dataSnapshot) {
          _that.setState({
            loggedIn: true, 
            loading: false
          });
        }.bind(this));

      }
    },

    render:function(){
      return (
        <div className="container">
          {this.state.loggedIn ? <Logout /> : null}
          {!this.state.loggedIn ? <AnonView /> : <MainView items={this.state.exercises} />}
          <Loader show={this.state.loading} />
        </div>
      )
    }
  });
module.exports = APP;