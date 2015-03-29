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
        <div>
          <h2>Register</h2>
          <form onSubmit={this.handleRegister} className="Register">
            <input ref="email" placeholder="Email" className="u-easy-bottom" />
            <input ref="password" placeholder="Password" type="password" className="u-easy-bottom" />
            <button type="submit" className="Button">Submit</button>
          </form>
        </div>
      )
    }
});

module.exports = Register;