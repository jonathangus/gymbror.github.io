/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');
var AppStore = require('../stores/app-store.js');
var Snap = require('snapsvg');

function graphSnap(id) {
  var s = Snap(id);
  var line = s.line(10, 100, 110, 200);
  var line = s.line(20, 200, 120, 200);
  var line = s.line(30, 300, 130, 200);
  var line = s.line(40, 400, 140, 200);
}

function _getDate(timestamp) {
  var date = new Date(timestamp);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  return '' + yyyy + '/' + (mm <= 9 ? '0' + mm : mm) + '/' + (dd <= 9 ? '0' + dd : dd);
}

var Graph =
  React.createClass({
    componentDidMount:function(){
      //graphSnap('#Graph-' + this.props.key);
    },
    removeItem:function(key) {
      AppActions.removeWorkout(this.props.exercise.name, key);
    },
    render:function(){
      var sets = [];

      for(var index in this.props.exercise.sets) {
        var set = this.props.exercise.sets[index];
        var graph = <div className="Set">
          <span>{_getDate(set.date)}</span> 
          <br />
          <span>reps: {set.values.join(', ')}</span>
          <button className="Button" onClick={this.removeItem.bind(this, index)}>Remove</button>
        </div>;
        sets.push(graph);
      }

      return (
        <div> 
          {sets}
        </div>
      )
    }
});

module.exports = Graph;

// <svg id={'Graph-' + this.props.key} version="1.1" xmlns="http://www.w3.org/2000/svg">

//         </svg>