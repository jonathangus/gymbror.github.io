/** @jsx React.DOM */
var React = require('react');

function _getDate(timestamp) {
  var date = new Date(timestamp);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  return '' + yyyy + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + (dd <= 9 ? '0' + dd : dd);
}

var Graph = React.createClass({
  propTypes: {
    exercise: React.PropTypes.object.isRequired,
  },
  render:function(){
    var list = [];

    for(index in this.props.exercise.workouts) {
      list.push(_getDate(this.props.exercise.workouts[index].date) + '   ');
      // console.log(this.props.exercise.workouts[index]);
    }

    return (


      <div>{list}</div>
    )
  }
});

module.exports = Graph;