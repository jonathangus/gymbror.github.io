/** @jsx React.DOM */
var React = require('react');
var AddWorkoutRow = require('./add-workout-row.js');
var ExercisesStore = require('../../stores/exercises-store.js');
var Pikaday = require('pikaday');
var ExercisesActions = require('../../actions/exercises-actions.js');
var _ = require('lodash');

var picker;
var lastWorkout = null;

var AddWorkout = React.createClass({
  getInitialState:function(){
    return {
      rows: _.values(this.props.lastworkout.values),
      removeButton: (this.props.lastworkout.values.length <= 1)
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({rows: _.values(nextProps.lastworkout.values)});
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
    this.buttonVisible();
  },

  componentDidUpdate: function(prevProps, prevState) {
    var lastInput;
    for(var index in this.refs) {
      if(index !== 'date') {
        lastInput = this.refs[index];
        // lastInput = attr.getDOMNode().querySelector('input');
      }
    }
    // lastInput.getDOMNode().querySelector('input').focus();
    // lastInput.getDOMNode().querySelector('input').value = lastInput.getDOMNode().querySelector('input').value;
  },

  buttonVisible: function() {
    if(this.state.rows.length <= 1) {
      this.setState({removeButton: true});
    }
    else {
      this.setState({removeButton: false});
    }
  },

  removeRow: function() {
    var rows = this.state.rows;
    rows.splice(-1,1);
    this.setState({rows: rows});
    this.buttonVisible();
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
    
    var summary = 0;

    sets.forEach(function(s) {
      summary += parseInt(s.value) * parseInt(s.reps);
    });

    var newWorkout = {
      date: d.getTime(),
      values: sets,
      summary: summary / sets.length
    }

    ExercisesActions.addWorkout(newWorkout, this.props.key);
  },

  render:function(){
    console.log(this.state.rows);
    var sets;
    sets = this.state.rows.map(function(row, i) {
      return <AddWorkoutRow ref={'w' + i} value={row.value} reps={row.reps} /> 
    });
    
    return (
      <div>
        <form className="Form" onSubmit={this.submitWorkout}>
        {sets}
        <input className="Form-anim" ref={'date'}/>
        <div onClick={this.addRow} className="Button Form-anim" role="button">New row</div>
        {this.state.removeButton ? null : <div onClick={this.removeRow} className="Button Form-anim" role="button">Remove row</div> }
        <button className="Button Form-anim" role="submit">Add</button>
        </form>
      </div>
    )
  }
});

module.exports = AddWorkout;