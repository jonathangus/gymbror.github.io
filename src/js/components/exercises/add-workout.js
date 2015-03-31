/** @jsx React.DOM */
var React = require('react');
var AddWorkoutRow = require('./add-workout-row.js');
var ExercisesStore = require('../../stores/exercises-store.js');
var Pikaday = require('pikaday');
var ExercisesActions = require('../../actions/exercises-actions.js');

var picker;
var lastWorkout = null;

var AddWorkout = React.createClass({
  getInitialState:function(){
    return {
      rows: this.props.lastworkout.values
    }
  },
  componentDidMount: function() {
    picker = new Pikaday({ field: this.refs.date.getDOMNode() });
    picker.setDate(new Date());
  },

  componentWillUnmount: function() {
    picker.destroy();
  },

  addRow: function() {
    var rows = this.state.rows,
      lastRow;

    for(var index in this.refs) {
      if(index !== 'date') {
        var attr = this.refs[index];
        lastRow = {
          reps: attr.getDOMNode().querySelector('select').value,
          value: attr.getDOMNode().querySelector('input').value
        }
      }
    }
    rows.push(lastRow);
    this.setState({rows: rows});
  },

  componentDidUpdate: function(prevProps, prevState) {
    var lastInput;
    for(var index in this.refs) {
      if(index !== 'date') {
        lastInput = this.refs[index];
        // lastInput = attr.getDOMNode().querySelector('input');
      }
    }
    lastInput.getDOMNode().querySelector('input').focus();
    lastInput.getDOMNode().querySelector('input').value = lastInput.getDOMNode().querySelector('input').value;
  },

  removeRow: function() {
    var rows = this.state.rows;
    rows.splice(-1,1);
    this.setState({rows: rows});
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
    sets = this.state.rows.map(function(row, i) {
      return <AddWorkoutRow ref={'w' + i} value={row.value} reps={row.reps} /> 
    });
    
    return (
      <div>
        <form onSubmit={this.submitWorkout}>
        {sets}
        <input ref={'date'}/>
        <div onClick={this.addRow} className="Button" role="button">New row</div>
        <div onClick={this.removeRow} className="Button" role="button">Remove row</div>
        <button className="Button" role="submit">Add</button>
        </form>
      </div>
    )
  }
});

module.exports = AddWorkout;