/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var Exercise = require('./app-exercise.js');

var ExercisesList = 
  React.createClass({
    render:function(){
      var items = this.props.exercises.map(function(exercise, key){
        return (
          <div>
            <Exercise key={key} exercise={exercise}/>
          </div>
        )
      });
      return (
        <div>
          {items}
        </div>
      ) 
  }
});

module.exports = ExercisesList;