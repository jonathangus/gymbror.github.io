/** @jsx React.DOM */
var React = require('react');
var ExercisesStore = require('../../stores/exercises-store.js');
var GraphItem = require('./graph-item.js');

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
    ExercisesStore.getSortedWorkouts(this.props.exerciseID).then(function(items) {
      that.setState({items: items});
    });
  },
  render:function(){

    var graph = [];

    for(index in this.state.items) {
      graph.push(<GraphItem item={this.state.items[index]} />)
    }

    return (

      <div>{graph}</div>
    )
  }
});

module.exports = Graph;