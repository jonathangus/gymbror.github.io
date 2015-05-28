/** @jsx React.DOM */
var React = require('react');

var Header = React.createClass({
  render:function(){

    return (
      <header>
        <ul>
          <li><a href="/">Home</a></li>
        </ul>
      </header>
    )
  }
});

module.exports = Header;