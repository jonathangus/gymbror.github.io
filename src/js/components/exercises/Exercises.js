/** @jsx React.DOM */
var React = require('react');

var Exercises = React.createClass({
  render:function(){
    return (
      <div>
        <h1>Exercises for {this.props.user.email}</h1>
      </div>
    )
  }
});

module.exports = Exercises;