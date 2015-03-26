/** @jsx React.DOM */
var React = require('react');

var Loader = React.createClass({
  render:function(){
    return (
      <div>
        {( this.props.show ? <div className="Loader">
          <div className="Loader-container">
            <div className="Loader-inner Loader-inner--one"></div>
            <div className="Loader-inner Loader-inner--two"></div>
            <div className="Loader-inner Loader-inner--three"></div>
          </div>
        </div>
     : null )}
    </div>
    )
  }
});

module.exports = Loader;