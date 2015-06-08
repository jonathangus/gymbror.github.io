/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var Swiper = require('swiper');

function dateMarkup(date) {
  
}

var Timeline = React.createClass({
  componentDidMount:function(){
    var mySwiper = new Swiper ('.Timeline', {
      wrapperClass: 'Timeline-wrapper',
      slideClass: 'Timeline-item',
      slidesPerView: 'auto',
      // freeMode: true
    });
  },
  render:function(){
    var items = _.sortBy(_.values(this.props.items), 'date').reverse();

    var rows = items.map(function(i) {
      return <div className="Timeline-item">
        <div className="Timeline-item-info">
          {i.values.map(function(ex) {
            return <div>{ex.value} | {ex.reps}</div>
          })}
        </div>
        <div className="Timeline-item-date">
          <span className="day">{moment(i.date).format('DD')}</span>
          <span className="month">{moment(i.date).format('MMM')}</span>
        </div>
      </div>
    });

    var list = items.map(function(i) {
      return <div className="Timeline-workout">
        {i.values.map(function(ex) {
          return <div>{ex.value} | {ex.reps}</div>
        })}
      </div>;
    });

    var dates = items.map(function(i) {
      return <div className="Timeline-dates-item">
        <span className="day">{moment(i.date).format('DD')}</span>
        <span className="month">{moment(i.date).format('MMM')}</span>
        </div>;
    });

    return (
      <div className="Timeline">
        <div className="Timeline-wrapper">
          { rows }
        </div>
      </div>
    )
  }
});

module.exports = Timeline;