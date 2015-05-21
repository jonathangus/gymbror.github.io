/** @jsx React.DOM */
var React = require('react');
var ExerciseList = require('./exercises/exercises-list.js');
var SelectedExercise = require('./exercises/seleted-exercise.js');
var ExercisesStore = require('../stores/exercises-store.js');
var ExercisesActions = require('../actions/exercises-actions.js');
var AddWorkout = require('./exercises/add-workout.js');
var _ = require('lodash');

var _selectedIndex;

var MainView =
  React.createClass({
    getInitialState:function(){
      return {
        selected: _.values(this.props.items)[0]
      }
    },

    setSelected: function(index) {
      if(index !== _selectedIndex) {
        this.setState({selected: this.props.items[index]});
        _selectedIndex = index;
      }
    },

    render:function(){
      return  (
        <div className="container">
          <ExerciseList items={this.props.items} setSelected={this.setSelected} />
          <SelectedExercise selected={this.state.selected} selectedKey={_selectedIndex}/>
        </div>
        )
    }
  });
module.exports = MainView;