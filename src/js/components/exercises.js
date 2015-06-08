/** @jsx React.DOM */
var React = require('react');
var ExerciseList = require('./exercises/exercises-list.js');
var SelectedExercise = require('./exercises/seleted-exercise.js');
var ExercisesStore = require('../stores/exercises-store.js');
var ExercisesActions = require('../actions/exercises-actions.js');
var AddWorkout = require('./exercises/add-workout.js');
var _ = require('lodash');

var _selectedIndex;

var Exercises =
  React.createClass({

    getInitialState:function(){
      _selectedIndex = Object.keys(this.props.items)[0];
      return {
        selected: _.values(this.props.items)[0]
      }
    },

    componentWillReceiveProps:function(nextProps){
      this.setState({selected: nextProps.items[_selectedIndex]});
    },

    setSelected: function(index) {
      if(index !== _selectedIndex) {
        this.setState({selected: this.props.items[index]});
        _selectedIndex = index;
      }
    },

    render:function(){
      console.log(_selectedIndex);
      return  (
        <div className="container">
          <ExerciseList items={this.props.items} setSelected={this.setSelected} />
          {_.values(this.props.items).length > 0 ? <SelectedExercise selected={this.state.selected} selectedKey={_selectedIndex}/> : null}
        </div>
        )
    }
  });
module.exports = Exercises;