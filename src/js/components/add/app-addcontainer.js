/** @jsx React.DOM */
var React = require('react');
var AddRow = require('./app-addrow.js');
var AppActions = require('../../actions/app-actions.js');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');

var setsValue = [];

var lastSet;
var biggestLastVal = 0;

var AddContainer =
  React.createClass({
    mixins:[ReactFireMixin],
    getInitialState:function(){
      return {
        sets: null
      }
    },
    componentWillMount:function(){
      this.bindAsArray(new Firebase('https://gymbror.firebaseio.com/exercises/' + this.props.exercise.name + '/sets'), 'sets');
    },
    componentDidMount:function(){
      if(this.state.sets.length == 0) {
        this.setState({sets: lastSet});
      }
    },
    handleClick:function() {
      var sets = [];

      for(var index in this.refs) { 
        var attr = this.refs[index];
        sets.push(attr.getDOMNode().querySelector('input').value);
      }

      var newWorkout = {
        date: new Date().getTime(),
        values: sets
      }

      this.firebaseRefs.sets.push(newWorkout);
      this.props.handleClick();

    },
    addRow:function() {
      if(this.state.sets.length > 0) {
        var pastSet = this.state.sets[this.state.sets.length - 1];
        pastSet.values.push(0);
        this.setState({sets:this.state.sets});
      }
      else {
        var pastSet = this.state.sets;
        pastSet.values.push(0);
        this.setState({sets:this.state.sets});
      }
    },
    removeRow:function() {

      if(this.state.sets.length > 0) {
        var pastSet = this.state.sets[this.state.sets.length - 1];
        pastSet.values.splice(-1, 1);
        this.setState({sets:this.state.sets});
      }
      else {
        var pastSet = this.state.sets;
        pastSet.values.splice(-1, 1);
        this.setState({sets:this.state.sets});
      }
    },
    render:function() {
      var _this = this;
      lastSet = this.state.sets[this.state.sets.length - 1];      

      if(!lastSet || typeof lastSet == 'undefined') {
        lastSet = {};
        lastSet.values = [0];
      }

      if(typeof this.state.sets.values !== 'undefined') {
        lastSet.values = this.state.sets.values;
      }

      var rows = lastSet.values.map(function(value, i) {
        return <AddRow ref={'set-' + i} value={value} key={i}/>
      });

      return (
        <div className="AddContainer">
          {rows}
          <button className="Button Button--half" onClick={this.addRow}>Add Row</button>
          <button className="Button Button--half" onClick={this.removeRow}>Remove Row</button>
          <button className="Button Button--full" onClick={this.handleClick}>Add Set</button>
        </div>
      )
    }
});

module.exports = AddContainer;