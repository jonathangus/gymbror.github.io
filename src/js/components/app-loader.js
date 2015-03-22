/** @jsx React.DOM */
var React = require('react');

var Loader = React.createClass({
  render:function(){
    return (
      <div className="Loader">
        <div className="Loader-inner Loader-inner--one"></div>
        <div className="Loader-inner Loader-inner--two"></div>
        <div className="Loader-inner Loader-inner--three"></div>
      </div>
    )
  }
});

module.exports = Loader;