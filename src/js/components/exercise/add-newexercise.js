/** @jsx React.DOM */
var React = require('react');

var NewExercise = React.createClass({
  getInitialState:function(){
    return {
      visible: false,
      value: null
    }
  },
  addWorkout:function() {
    this.props.addWorkout(this.state.value);
    this.setState({value: ''});
  },
  handleChange:function(event) {
    this.setState({value: event.target.value});
  },
  render:function(){
    return (
      <div>
        <h2>Add new exercise</h2>
        <input onChange={this.handleChange} value={this.state.value} />
        { this.state.value ? <button onClick={this.addWorkout} className="Button u-easy-top">Submit</button> : null }
      </div>
    )
  }
});

module.exports = NewExercise;