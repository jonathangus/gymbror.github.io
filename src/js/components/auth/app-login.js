/** @jsx React.DOM */
var React = require('react');

var Login = 
  React.createClass({
    componentDidMount:function(){
      this.refs.email.getDOMNode().focus();
    },
    handleLogin:function(e) {
      e.preventDefault();
      var email = this.refs.email.getDOMNode().value;
      var password = this.refs.password.getDOMNode().value;
      this.props.handleLogin(email, password);
    },
    render:function() {
      return (
        <div className={this.props.class}>
          <h2>Login</h2>
          <form onSubmit={this.handleLogin} className="Form">
            <input type="text" ref="email" placeholder="Email" required="_" className="Form-input Form-anim" />
            
            <input ref="password" placeholder="Password" type="password" required="_" className="Form-input Form-anim" />
            <button type="submit" className="Button Form-anim">Login</button>
          </form>
        </div>
      )
    }
});

module.exports = Login;