/** @jsx React.DOM */
var React = require('react');
var Timeline = require('../timeline/timeline.js');
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
      var children = 0;
      if(this.props.selected) {
        children = _.values(this.props.selected.workouts).length;
      }

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
          <div className="SelectedExercise-top">
            <h1 className="SelectedExercise-title">{this.props.selected.name}</h1>
            <div className="SelectedExercise-remove" onClick={this.removeExercise}></div>
          </div>
          { children > 0 ? <Timeline items={this.props.selected.workouts} /> : null }
          <AddWorkout lastworkout={lastworkout} key={this.props.selectedKey} />
        </div>
        )
    }
  });
module.exports = SelectedExercise;