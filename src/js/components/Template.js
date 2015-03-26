/** @jsx React.DOM */
var React = require('react');
var Auth = require('./auth/app-auth.js');

var Template = React.createClass({
  render:function(){
    return (
      <div className="container">
        
        {this.props.children}
      </div>
    )
  }
});

module.exports = Template;