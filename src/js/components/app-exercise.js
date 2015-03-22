/** @jsx React.DOM */
var React = require('react');
var Graph = require('./app-graph.js');
var AddHandler = require('./add/app-addhandler.js');

var Exercise =
  React.createClass({
    render:function(){
      return (
        <div>
          <h1>{this.props.exercise.name}</h1>
          <Graph exercise={this.props.exercise} key={this.props.key}/>
          <AddHandler exercise={this.props.exercise} />
        </div>
      ) 
    }
});

module.exports = Exercise;