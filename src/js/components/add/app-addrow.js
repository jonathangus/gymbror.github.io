/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');

var AddRow =
  React.createClass({
    getInitialState:function() {
      return {
        value: this.props.value
      }
    },
    handleChange: function(event) {
      this.setState({value: event.target.value});
    },
    increase:function() {
      this.setState({value: parseInt(this.state.value) + 1});
    },
    decrease:function() {
      this.setState({value: parseInt(this.state.value) - 1});
    },
    render:function() {
      return (
        <div className="Addrow">
          <input className="Addrow-input" type="text" value={this.state.value} onChange={this.handleChange} />
          <div className="Button" onClick={this.decrease}>-</div>
          <div className="Button" onClick={this.increase}>+</div>
        </div>
      )
    }
});

module.exports = AddRow;