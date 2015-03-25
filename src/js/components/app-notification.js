/** @jsx React.DOM */
var React = require('react');

var Notification = React.createClass({
  render:function(){
    return (
      <div className={"Notification Notification--" + this.props.type}>
        {this.props.message}
      </div>
    )
  }
});

module.exports = Notification;