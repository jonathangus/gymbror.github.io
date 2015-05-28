/** @jsx React.DOM */
var React = require('react');
var NewExercise = require('./new-exercise.js');
var ExerciseItem = require('./exercise-item.js');

var ExercisesList = React.createClass({
  changeExercise: function(index) {
    this.props.setSelected(index);
  },

  render:function(){
    var items = [];

    for(index in this.props.items) {
      items.push(<ExerciseItem changeExercise={this.changeExercise} id={index} exercise={this.props.items[index]} />);
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