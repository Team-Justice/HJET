import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './LoginBox.css';

class LoginBox extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      errors: []
    };
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value});
  }

  onChangePassword(e) {
    this.setState({password: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    let error = validate(this.state.username, this.state.password);
    if (error.length != 0) {
      this.setState({errors: error});
      return;
    }

    const loginUser = {
      username: this.state.username,
      password: this.state.password,
    };

  }

  render() {
    return (
      <div className="inner-container">
        <div className="box">
          <form onSubmit = {this.onSubmit}>
            {this.state.errors.map(error => (
              <p key={error}>Error: {error}</p>
            ))}
            <div className="input-group">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                required
                name="username"
                className="login-input"
                placeholder="Username"
                value = {this.state.username}
                onChange = {this.onChangeUsername}
                />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password:&nbsp; {' '} </label>
              <input
                type="password"
                required
                name="password"
                className="login-input"
                placeholder="Password"
                value = {this.state.password}
                onChange = {this.onChangePassword}
                />
            </div>

            <button
              type="button"
              className="login-btn"
              onClick={this
              .onSubmit
              .bind(this)}><label>Login</label></button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(username, password) {
  const errors = [];
  var error = '';
  // verify username/passcode

  if (username == '') {
    error = 'Please enter a username';
    console.log(error);
    errors.push(error);
  } 

  if (password == '') {
    error = 'Please enter a password';
    console.log(error);
    errors.push(error);
  }


  return errors;
}

export default LoginBox