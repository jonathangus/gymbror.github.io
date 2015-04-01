/** @jsx React.DOM */
var React = require('react');

function _getDate(timestamp) {
  var date = new Date(timestamp);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  return '' + yyyy + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + (dd <= 9 ? '0' + dd : dd);
}

var GraphItem = React.createClass({
  removeWorkout: function() {
    this.props.removeWorkout(this.props.key);
  },
  render:function(){
    return (
      <div>
        {_getDate(this.props.item.date)}
        <span onClick={this.removeWorkout}>   X</span>
      </div>
    )
  }
});

module.exports = GraphItem;