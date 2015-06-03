/** @jsx React.DOM */
var React = require('react');
var NewExercise = require('./new-exercise.js');
var ExerciseItem = require('./exercise-item.js');
var Logout = require('../auth/logout.js');

var ExercisesList = React.createClass({
  getInitialState:function(){
    return {
      openMenu: false
    }
  },

  changeExercise: function(index) {
    this.props.setSelected(index);
    this.setState({openMenu: false});
  },

  toggleMenu: function() {
    this.setState({openMenu: !this.state.openMenu});
  },

  render:function(){
    var items = [];

    for(index in this.props.items) {
      items.push(<ExerciseItem changeExercise={this.changeExercise} id={index} exercise={this.props.items[index]} />);
    }

    var openMenu = this.state.openMenu ? ' ExerciseList-inner--open' : '';

    return (
      <div className='ExerciseList'>
        <div className="ExerciseList-menu" onClick={this.toggleMenu}></div>
        <div className={"ExerciseList-inner" + openMenu}>
          {items}
          <NewExercise />
          <Logout />
        </div>
      </div>
    )
  }
});

module.exports = ExercisesList;