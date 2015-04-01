/** @jsx React.DOM */
var React = require('react');

var AddWorkoutRpw = React.createClass({
  getInitialState:function(){
    return {
      value: this.props.value
    }
  },

  onChange: function(e) {
    this.setState({value: event.target.value});
  },
  
  increase:function() {
    this.setState({value: parseInt(this.state.value) + 1});
  },

  decrease:function() {
    this.setState({value: parseInt(this.state.value) - 1});
  },

  render:function(){
    var count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    var options = count.map(function(val) {
      return <option value={val}>{val}</option>
    });

    return (
      <div>
        <input value={this.state.value} onChange={this.onChange}/>
         <select defaultValue={this.props.reps}>
          {options}
        </select>
        <button type="button" className="Button" onClick={this.decrease}>-</button>
        <button type="button" className="Button" onClick={this.increase}>+</button>
      </div>
    )
  }
});

module.exports = AddWorkoutRpw;