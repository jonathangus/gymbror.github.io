/** @jsx React.DOM */
var React = require('react');
var ExercisesList = require('./app-exerciseslist.js');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var Login = require('./login/app-login.js');
var Loader = require('./app-loader.js');
var NewExercise = require('./exercise/add-newexercise.js');

var APP = 
  React.createClass({
    mixins:[ReactFireMixin],
    getInitialState:function(){
      return {
        exercises: [],
        loading: false
      }
    },
    componentWillMount:function(){
      var _this = this;
      this.setState({loading: true});
      this.firebaseRef = new Firebase('https://gymbror.firebaseio.com/exercises');
      this.bindAsArray(this.firebaseRef, 'exercises');

      this.firebaseRef.on('child_added', function(dataSnapshot) {
        _this.setState({loading: false});
      });
    },
    addHandler:function(name) {
      var ex = {};
      ex.name = name;
      this.firebaseRef.child(name).set({name: name});
    },
    render:function(){
      return (
        <div>
          <Login />
          { this.state.loading ? <Loader /> : <div><ExercisesList exercises={this.state.exercises} /> <NewExercise addWorkout={this.addHandler} /></div>}
          
          
        </div>
      )
    }
});

module.exports = APP;