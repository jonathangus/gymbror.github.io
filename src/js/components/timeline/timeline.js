/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var moment = require('moment');

var Timeline = React.createClass({
  render:function(){
    var items = _.values(this.props.items);

    var list = items.map(function(i) {
      return <div className="Timeline-workout">
        {i.values.map(function(ex) {
          return <div>{ex.value} | {ex.reps}</div>
        })}
      </div>;
    });

    var dates = items.map(function(i) {
      return <div className="Timeline-dates-item">
        <span className="day">{moment(i.date).format('YY')}</span>
        <span className="month">{moment(i.date).format('MMM')}</span>
        </div>;
    });

    return (
      <div className="Timeline">
        <div className="Timeline-container">
          { list }
        </div>
        <div className="Timeline-dates">
        { dates }
        </div>
      </div>
    )
  }
});

module.exports = Timeline;