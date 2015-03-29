/** @jsx React.DOM */
var React = require('react');
var AddWorkoutRow = require('./add-workout-row.js');
var ExercisesStore = require('../../stores/exercises-store.js');
var Pikaday = require('pikaday');
var ExercisesActions = require('../../actions/exercises-actions.js');

var picker;
var lastWorkout = null;

var AddWorkout = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
  },
  componentDidMount: function() {
    picker = new Pikaday({ field: this.refs.date.getDOMNode() });
    picker.setDate(new Date());
  },

  componentWillUnmount: function() {
    picker.destroy();
  },

  submitWorkout: function(e) {    
    e.preventDefault();
    var sets = [];

    for(var index in this.refs) {
        if(index !== 'date') {
        var attr = this.refs[index];
        var set = {
          reps: attr.getDOMNode().querySelector('select').value,
          value: attr.getDOMNode().querySelector('input').value
        }
        sets.push(set);
      }
    }

    var d = new Date(this.refs.date.getDOMNode().value);
    
    var newWorkout = {
      date: d.getTime(),
      values: sets
    }

    ExercisesActions.addWorkout(newWorkout, this.props.key);
    this.props.toggleAdd();
  },

  render:function(){
    var sets;
    console.log(this.props.lastworkout);
    sets = this.props.lastworkout.values.map(function(row, i) {
      return <AddWorkoutRow ref={'w' + i} value={row.value} reps={row.reps} /> 
    });
    
    return (
      <div>
        <form onSubmit={this.submitWorkout}>
        {sets}
        <input ref={'date'}/>
        <button className="Button" role="submit">Add</button>
        </form>
      </div>
    )
  }
});

module.exports = AddWorkout;