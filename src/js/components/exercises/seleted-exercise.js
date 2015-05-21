/** @jsx React.DOM */
var React = require('react');
var Graph = require('./graph.js');
var AddWorkout = require('./add-workout.js');
var ExercisesActions = require('../../actions/exercises-actions.js');
var _ = require('lodash');

var swal = require('sweetalert');
swal.setDefaults({ allowOutsideClick: true });

var lastworkout;

var SelectedExercise =
  React.createClass({

    removeExercise: function() {
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
        ExercisesActions.removeExercise(that.props.selectedKey);
      });
    },

    render:function(){
      if(this.props.selected.workouts) {
        for(index in this.props.selected.workouts) {
          lastworkout = this.props.selected.workouts[index];
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
      
      return  (
        <div className='SelectedExercise'>
          <h1>{this.props.selected.name}</h1>
          <Graph items={this.props.selected.workouts} />
          <AddWorkout lastworkout={lastworkout} key={this.props.selectedKey} />
          <span onClick={this.removeExercise}>Remove exercise</span>
        </div>
        )
    }
  });
module.exports = SelectedExercise;