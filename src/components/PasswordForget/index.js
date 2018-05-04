import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';
import styles from '../Account/styles.css';
import styles2 from '../../styles/theme.css';

import {auth, changeName} from '../../firebase';


const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  name: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { name } = this.state;

    changeName(name)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      }).then(()=> console.log(auth.currentUser.displayName))
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  };

  render() {
    const {
      name,
      error,
    } = this.state;

    const isInvalid = name === '';

    return (
      <form className={styles.accountForm} onSubmit={this.onSubmit}>
        <input className={styles2.input}
          value={name}
          onChange={event => this.setState(updateByPropertyName('name', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          change My name
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
