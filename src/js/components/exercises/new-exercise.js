/** @jsx React.DOM */
var React = require('react');
var ExercisesActions = require('../../actions/exercises-actions.js');

var NewExercise = React.createClass({
  getInitialState:function(){
    return {
      visible: false,
      value: null
    }
  },
  addWorkout:function(e) {
    e.preventDefault();
    ExercisesActions.addExercise(this.state.value);
    this.setState({value: ''});
  },
  handleChange:function(event) {
    this.setState({value: event.target.value});
  },
  render:function(){
    return (
      <div>
        <h2>Add new exercise</h2>
        <form onSubmit={this.addWorkout}>
          <input onChange={this.handleChange} value={this.state.value} />
          { this.state.value ? <button onClick={this.addWorkout} className="Button u-easy-top">Submit</button> : null }
        </form>
      </div>
    )
  }
});

module.exports = NewExercise;