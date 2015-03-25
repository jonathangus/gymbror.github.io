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
        <div>
          <h2>Login</h2>
          <form onSubmit={this.handleLogin} className="Login">
            <input ref="email" placeholder="Email" className="u-easy-bottom" />
            <input ref="password" placeholder="Password" type="password" className="u-easy-bottom" />
            <button type="submit" className="Button">submit</button>
          </form>
        </div>
      )
    }
});

module.exports = Login;