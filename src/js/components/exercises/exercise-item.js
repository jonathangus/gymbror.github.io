/** @jsx React.DOM */
var React = require('react');
var ExercisesActions = require('../../actions/exercises-actions.js');
var Graph = require('./graph.js');
var AddWorkout = require('./add-workout.js');
var _ = require('lodash');

var swal = require('sweetalert');
swal.setDefaults({ allowOutsideClick: true });

var lastworkout;

var ExerciseItem = React.createClass({
  getInitialState:function(){
    return {
      open: false
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

  set: function() {
    this.props.changeExercise(this.props.id);
  },

  componentWillMount:function(){
    var lastkey;

    if(this.props.exercise.workouts) {
      for(index in this.props.exercise.workouts) {
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
      <div className="ExerciseItem">
      <h2 className="ExerciseItem-title" onClick={this.set}>{this.props.exercise.name}</h2>
      </div>
    )
  }
});

module.exports = ExerciseItem;