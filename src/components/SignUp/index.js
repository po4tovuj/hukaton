import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword, doCheckAuth } from '../../firebase';
import * as routes from '../../constants/routes';
import styles from '../SignIn/styles.css';

const SignUpPage = ({history}) => (
    <div>
        <SignUpForm history={history}/>
    </div>
);

const INITIAL_STATE = {
    displayName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value,
        })
    };

    onSubmit = (event) => {
        event.preventDefault();
        const {
            displayName,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        doCreateUserWithEmailAndPassword(displayName, email, passwordOne);
        doCheckAuth(() => {
            history.push(routes.HOME);
        });
    };

    render() {
        const {
            displayName,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            displayName === '' ||
            email === '';

        return (
            <form className={styles.form} onSubmit={this.onSubmit}>
                <input className={styles.input} value={displayName} name="displayName" onChange={this.handleChange}
                       type="text"
                       placeholder="Full Name"
                />
                <input className={styles.input} name="email" value={email} onChange={this.handleChange} type="text"
                       placeholder="Email Address"
                />
                <input className={styles.input} name="passwordOne" value={passwordOne} onChange={this.handleChange}
                       type="password"
                       placeholder="Password"
                />
                <input className={styles.input} name="passwordTwo" value={passwordTwo} onChange={this.handleChange}
                       type="password"
                       placeholder="Confirm Password"
                />
                <button className={styles.button} disabled={isInvalid} type="submit">
                    Sign Up
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
);

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};