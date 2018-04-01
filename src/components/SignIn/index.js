import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { doSignInWithEmailAndPassword } from '../../firebase';
import * as routes from '../../constants/routes';
import  styles from './styles.css';


const SignInPage = ({ history }) =>(
  <div>

    <SignInForm history={history} />
  </div>);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  };

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <input className={styles.input}
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input className={styles.input}
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button className={styles.button} disabled={isInvalid} type="submit">
          Log In
        </button>
        <PasswordForgetLink />
        <SignUpLink />

        { error && <p>{error.message}</p> }

      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
