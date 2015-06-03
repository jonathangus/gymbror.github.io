/** @jsx React.DOM */
var React = require('react');

var Register = 
  React.createClass({
    componentDidMount:function(){
      this.refs.email.getDOMNode().focus();
    },
    handleRegister:function(e) {
      e.preventDefault();
      var email = this.refs.email.getDOMNode().value;
      var password = this.refs.password.getDOMNode().value;
      this.props.handleRegister(email, password);
    },
    render:function() {
      return (
        <div className={this.props.class}>
          <h1 className="Auth-title">Register</h1>
          <form onSubmit={this.handleRegister} className="Form">
            <input type="text" required="_" ref="email" placeholder="Email" className="Form-input Form-anim" />
            <input type="text" required="_" ref="password" placeholder="Password" type="password" className="Form-input Form-anim" />
            <button type="submit" className="Button Form-anim">Register</button>
          </form>
        </div>
      )
    }
});

module.exports = Register;