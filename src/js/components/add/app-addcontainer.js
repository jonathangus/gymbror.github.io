/** @jsx React.DOM */
var React = require('react');
var AddRow = require('./app-addrow.js');
var AppActions = require('../../actions/app-actions.js');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var Pikaday = require('pikaday');

var picker;
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
      picker = new Pikaday({ field: this.refs.date.getDOMNode() });
      picker.setDate(new Date());
      this.refs.lastrow.getDOMNode().querySelector('input').focus();
    },
    componentWillUnmount:function() {
      picker.destroy();
    },
    addRow:function() {
      if(this.state.sets.length > 0) {
        var pastSet = this.state.sets[this.state.sets.length - 1];
        pastSet.values.push('');
        this.setState({sets:this.state.sets});
      }
      else {
        var pastSet = this.state.sets;
        pastSet.values.push('');
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
    addWorkout:function(e) {
      e.preventDefault();

      var sets = [];
      for(var index in this.refs) {
          if(index !== 'date') {
          var attr = this.refs[index];
          sets.push(attr.getDOMNode().querySelector('input').value);
        }
      }

      var d = new Date(picker.getDate());
      var newWorkout = {
        date: d.getTime(),
        values: sets
      }

      this.firebaseRefs.sets.push(newWorkout);
      this.props.handleClick();

      
      return;
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
        if (i === lastSet.values.length - 1) {
          return <AddRow ref={'lastrow'} value={value} key={i}/>
        }
        else {
          return <AddRow ref={'set' + i} value={value} key={i}/>
        }
      });

      return (
        <form className="AddContainer" onSubmit={this.addWorkout}>
          {rows}
          <input type="text" className="u-easy-bottom" ref={'date'} />
          <button type="button" className="Button Button--half" onClick={this.addRow}>Add Row</button>
          <button type="button" className="Button Button--half" onClick={this.removeRow}>Remove Row</button>
          <input className="Button" type="submit" value="Add set" />
        </form>
      )
    }
});

module.exports = AddContainer;