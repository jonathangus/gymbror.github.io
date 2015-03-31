/** @jsx React.DOM */
var React = require('react');
var ExercisesStore = require('../../stores/exercises-store.js');
var ExercisesActions = require('../../actions/exercises-actions.js');
var NewExercise = require('./new-exercise.js');
var ExerciseItem = require('./exercise-item.js');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Exercises = React.createClass({
  getInitialState:function(){
    return {
      items: []
    }
  },
  componentDidMount: function() {
    ExercisesStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ExercisesStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({items: ExercisesStore.getExercises()});
  },
  render:function(){
    var items = [];

    for(index in this.state.items) {
      items.push(<ExerciseItem key={index} exercise={this.state.items[index]} />);
    }

    return (
      <div>
        {items}
        <NewExercise />
      }
      </div>
    )
  }
});

module.exports = Exercises;