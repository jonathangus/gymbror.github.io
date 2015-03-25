/** @jsx React.DOM */
var React = require('react');
var ExercisesList = require('./app-exerciseslist.js');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var Loader = require('./app-loader.js');
var NewExercise = require('./exercise/add-newexercise.js')
var Auth = require('./auth/app-auth.js');
var LoggedInMixin = require('../mixins/LoggedInMixin.js');

function cartItems(){
  return {items: AppStore.getCart()}
}

var APP = 
  React.createClass({
    mixins:[ReactFireMixin, LoggedInMixin],
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
          <Auth />
        </div>
      )
    }
});

module.exports = APP;

 // { this.state.loading ? <Loader /> : <div><ExercisesList exercises={this.state.exercises} /> <NewExercise addWorkout={this.addHandler} /></div>}