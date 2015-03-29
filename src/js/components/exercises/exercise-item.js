/** @jsx React.DOM */
var React = require('react');
var ExercisesActions = require('../../actions/exercises-actions.js');
var Graph = require('./graph.js');
var AddWorkout = require('./add-workout.js');

var swal = require('sweetalert');
swal.setDefaults({ allowOutsideClick: true });

var lastworkout;

var ExerciseItem = React.createClass({
  getInitialState:function(){
    return {
      open: true
    }
  },
  remove:function() {
    var that = this;
    swal({   
      title: "Are you sure you want do delete this exercise?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false 
    }, function(){
      swal({
        title: "Deleted!", 
        text: "Your exercise has been deleted.", 
        type: "success",
        timer: 1250,
      }); 
      ExercisesActions.removeExercise(that.props.key);
    });
  },
  toggleAdd: function() {
    this.setState({open: !this.state.open});
  },
  componentWillMount:function(){
    console.log(this.props.exercise);
    var lastkey;

    if(this.props.exercise.workouts) {
      for(index in this.props.exercise.workouts) {
        console.log(index);
        lastkey = index;
        lastworkout = this.props.exercise.workouts[index];
      }
    }
    else {
      lastworkout = {
        values: [{
          value: 0,
          reps: 0
        }]
      }
    }

    
  },
  render:function(){
    return (
      <div>
      <h1>{this.props.exercise.name}</h1>
      <Graph exercise={this.props.exercise} />
      <button onClick={this.remove} className="Button">Remove</button>
      <button className="Button" onClick={this.toggleAdd}>Add workout</button>
      {this.state.open ? <AddWorkout toggleAdd={this.toggleAdd} lastworkout={lastworkout} key={this.props.key} /> : null }
      </div>
    )
  }
});

module.exports = ExerciseItem;