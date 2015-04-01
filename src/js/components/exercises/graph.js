/** @jsx React.DOM */
var React = require('react');
var ExercisesStore = require('../../stores/exercises-store.js');
var GraphItem = require('./graph-item.js');
var ExercisesActions = require('../../actions/exercises-actions.js'); 

var Graph = React.createClass({
  getInitialState:function(){
    return {
      items: null
    }
  },
  propTypes: {
    exerciseID: React.PropTypes.string.isRequired,
  },
  componentDidMount: function() {
    var that = this;

    ExercisesStore.addChangeListener(this._onChange);
    ExercisesStore.getSortedWorkouts(this.props.exerciseID).then(function(items) {
      that.setState({items: items});
    });
  },

  componentWillUnmount: function() {
    ExercisesStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    var that = this;
    
    ExercisesStore.getSortedWorkouts(this.props.exerciseID).then(function(items) {
      that.setState({items: items});
    });
  },

  removeWorkout: function(workoutId) {
    ExercisesActions.removeWorkout(this.props.exerciseID, workoutId);
  },

  render:function(){

    var graph = [];

    for(key in this.state.items) {
      graph.push(<GraphItem key={key} removeWorkout={this.removeWorkout} item={this.state.items[key]} />)
    }

    return (

      <div>{graph}</div>
    )
  }
});

module.exports = Graph;