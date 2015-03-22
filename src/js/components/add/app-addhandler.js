/** @jsx React.DOM */
var React = require('react');
var AddContainer = require('./app-addcontainer.js');

var AddHandler =
  React.createClass({
    getInitialState:function(){
      return {
        open: false
      }
    },
    toggleRows:function() {
      this.setState({open: !this.state.open});
    },
    render:function(){
      return (
        <div>
          <button className="Button !Button--add" onClick={this.toggleRows}>Add Workout</button>
          { this.state.open ? <AddContainer handleClick={this.toggleRows} exercise={this.props.exercise} /> : null }
        </div>
      )
    }
});

module.exports = AddHandler;