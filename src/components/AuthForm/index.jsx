import React, { Component } from 'react';
import {auth, usersDbRef} from '../../firebase';

import styles from './styles.css';

class AuthForm extends Component {
    state = {
        email: '',
        password: '',
    };

    handleInputChange = evt => {
        const value = evt.target.value;
        const type = evt.target.type;

        this.setState({ [type]: value });
    };

    handleCreateUser = evt => {
        const { email, password } = this.state;
        evt.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                const currentUser = {
                    id: user.uid,
                    email: user.email,
                };

                usersDbRef
                    .child(currentUser.id)
                    .set(currentUser);

            })
            .catch(error => console.log(error));

    };

    handleSignInUser = evt => {
        const { email, password } = this.state;
        evt.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch(error => console.log(error));
    };

    render() {
        const { email, password } = this.state;

        return (
            <form className={styles.form}>
                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={this.handleInputChange}
                    placeholder="Email"
                    required
                    autoFocus
                />
                <input
                    className={styles.input}
                    type="password"
                    value={password}
                    onChange={this.handleInputChange}
                    placeholder="Password"
                    required
                />
                <div className={styles.actions}>
                    <button className={styles.button} onClick={this.handleCreateUser}>
                        Sign Up
                    </button>
                    <button className={styles.button} onClick={this.handleSignInUser}>
                        Log In
                    </button>
                </div>
            </form>
        );
    }
}

export default AuthForm;