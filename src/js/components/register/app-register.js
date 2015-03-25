/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');
var RegisterForm = require('./app-registerform.js');

var Register = 
  React.createClass({
    getInitialState:function(){
      return {
        show: false
      }
    },
    handleRegister:function(bree) {
      AppStore.registerUser('aa', 'bb');
    },
    showRegister:function() {
      this.setState({show: !this.state.show});
    },
    render:function() {
      return (
        <div className="Register">
          <button className="Button u-easy-bottom" onClick={this.showRegister}>Register</button>
          { this.state.show ? <RegisterForm ref={"form"} onAuth={this.handleRegister} /> : null }
        </div>
      )
    }
});

module.exports = Register;