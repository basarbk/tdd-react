import { Component } from 'react';

class SignUpPage extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input id="username" />
        <label htmlFor="email">E-mail</label>
        <input id="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input id="passwordRepeat" type="password" />
        <button disabled>Sign Up</button>
      </div>
    );
  }
}

export default SignUpPage;
