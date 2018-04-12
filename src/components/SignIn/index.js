import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from '../SignUp';
import { doSignInWithEmailAndPassword } from '../../firebase';
import * as routes from '../../constants/routes';
import styles from './styles.css';

const SignInPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
  </div>
);

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

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    const { history } = this.props;

    doSignInWithEmailAndPassword(email, password).then(() =>
      history.push(routes.HOME),
    );
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <input
          className={styles.input}
          value={email}
          onChange={event =>
            this.setState(updateByPropertyName('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          className={styles.input}
          value={password}
          onChange={event =>
            this.setState(updateByPropertyName('password', event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <button className={styles.button} disabled={isInvalid} type="submit">
          Log In
        </button>
        <SignUpLink />

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
