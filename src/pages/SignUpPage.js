import { Component } from 'react';

class SignUpPage extends Component {
  state = {
    password: '',
    passwordRepeat: ''
  };

  onChangePassword = (event) => {
    const currentValue = event.target.value;
    this.setState({
      password: currentValue
    });
  };

  onChangePasswordRepeat = (event) => {
    const currentValue = event.target.value;
    this.setState({
      passwordRepeat: currentValue
    });
  };

  render() {
    let disabled = true;
    const { password, passwordRepeat } = this.state;
    if (password && passwordRepeat) {
      disabled = password !== passwordRepeat;
    }
    return (
      <div>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <input id="username" />
        <label htmlFor="email">E-mail</label>
        <input id="email" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={this.onChangePassword} />
        <label htmlFor="passwordRepeat">Password Repeat</label>
        <input
          id="passwordRepeat"
          type="password"
          onChange={this.onChangePasswordRepeat}
        />
        <button disabled={disabled}>Sign Up</button>
      </div>
    );
  }
}

export default SignUpPage;
