/** @jsx React.DOM */
var React = require('react');

var AddWorkoutRow = React.createClass({
  getInitialState:function(){
    return {
      value: this.props.value,
      reps: this.props.reps
    }
  },

  onChangeValues: function(e) {
    if(/^\d+$/.test(event.target.value) || event.target.value === '') {
      this.setState({value: event.target.value});
    }
  },

  onChangeReps: function(e) {
    if(/^\d+$/.test(event.target.value) || event.target.value === '') {
      this.setState({reps: event.target.value});
    }
  },

  increaseValues:function() {
    this.setState({value: parseInt(this.state.value) + 1});
  },

  decreaseValues:function() {
    this.setState({value: parseInt(this.state.value) - 1});
  },

  increaseReps:function() {
    this.setState({reps: parseInt(this.state.reps) + 1});
  },

  decreaseReps:function() {
    this.setState({reps: parseInt(this.state.reps) - 1});
  },

  render:function(){
    var count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    var options = count.map(function(val) {
      return <option value={val}>{val}</option>
    });

    return (
      <div className="Form-anim AddWorkoutRow" >
        <div className="AddWorkoutRow-values">
          <label>Värde
            <input value={this.state.value} onChange={this.onChangeValues}/>
          </label>
          <div role="button" tabindex="0" className="Icon Icon--add" onClick={this.increaseValues}></div>
          <div role="button" tabindex="0" className="Icon Icon--remove" onClick={this.decreaseValues}></div>
        </div>

        <div className="AddWorkoutRow-values">
          <label>Reps
            <input value={this.state.reps} onChange={this.onChangeReps}/>
          </label>
          <div role="button" tabindex="0" className="Icon Icon--add" onClick={this.increaseReps}></div>
          <div role="button" tabindex="0" className="Icon Icon--remove" onClick={this.decreaseReps}></div>
        </div>
      </div>
    )
  }
});

module.exports = AddWorkoutRow;