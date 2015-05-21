/** @jsx React.DOM */
var React = require('react');
var ExercisesStore = require('../../stores/exercises-store.js');
var ExercisesActions = require('../../actions/exercises-actions.js');
var NewExercise = require('./new-exercise.js');
var ExerciseItem = require('./exercise-item.js');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var ExercisesList = React.createClass({
  changeExercise: function(index) {
    this.props.setSelected(index);
  },

  render:function(){
    var items = [];

    for(index in this.props.items) {
      items.push(<ExerciseItem changeExercise={this.changeExercise} key={index} exercise={this.props.items[index]} />);
    }

    return (
      <div className='ExerciseList'>
        {items}
        <NewExercise />
      </div>
    )
  }
});

module.exports = ExercisesList;