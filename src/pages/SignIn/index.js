import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './signin.css';

export class SignIn extends Component {
  state = {
    email: '',
    password: '',
    errMsg: '',
    redirectToHome: false,
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const userDetails = { email, password };
    const response = await fetch('https://mittarrv-1.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });
    const data = await response.json();
    if (response.status === 200) {
      this.onSuccess(data.token);
    } else {
      this.onFail(data.errors);
    }
  };

  onSuccess = token => {
    Cookies.set('jwt_token', token, { expires: 30 });
    this.setState({ redirectToHome: true });
  };

  onFail = errorData => {
    let errorMessage = '';
    if (Array.isArray(errorData)) {
      errorMessage = errorData.join(', ');
    } else if (typeof errorData === 'string') {
      errorMessage = errorData;
    } else if (typeof errorData === 'object' && errorData.msg) {
      errorMessage = errorData.msg;
    } 
    this.setState({ errMsg: errorMessage });
  };

  render() {
    const { email, password, errMsg, redirectToHome } = this.state;
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined || redirectToHome) {
      return <Navigate to="/" replace />;
    }

    return (
      <div className="login-container">
        <div className='signin-container'>
          <h1 className='login-heading'>Sign In</h1>
          <form onSubmit={this.handleSubmit} className="login-form-container">
            <label htmlFor="emailId" className='login-label'>Email</label>
            <input className='login-input1'
              id="emailId"
              value={email}
              onChange={this.handleEmailChange}
              placeholder="Email"
              type="email"
              required
            />

            <label htmlFor="passwordId" className='login-label'>Password</label>
            <input className='login-input2'
              id="passwordId"
              value={password}
              onChange={this.handlePasswordChange}
              placeholder="Password"
              type="password"
              required
            />
            
            <button type='submit' className='sign-in-btn'>Sign In</button>
            <p className='signup-text'>Not a Member ? <span className='signup'><Link to="/register">Sign up here</Link></span>.</p>

            {errMsg && <p className="err-msg">{errMsg}</p>}
          </form>
          
        </div>
      </div>
    );
  }
}
