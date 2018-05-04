import React, { Component } from 'react';
import ChangePhoto from './ChangePhoto'
import MainInfo from './MainInfo';
import ChangePassword from './ChangePassword';
import PasswordChangeForm from '../PasswordChange';
import styles from './styles.css';
import {auth, changeName} from '../../firebase';

const INITIAL_STATE = {
};

export default class AccountPage extends Component {

    state = {
        ...INITIAL_STATE,
            };
    handleInputOnChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value,
        });
        console.log(this.state);
    };
    handleChangeName = (evt) => {
        evt.preventDefault();
       const user = auth.currentUser;

        const { name  } = this.state;
       changeName(user, name)
    };

    render() {
        const {name, email} = this.state;
        const isInValid = name === '';

        console.log(name);
        return (
            <div className={styles.profile_editor}>
                <ChangePhoto  />
                <MainInfo onChange={this.handleInputOnChange} nameInValid={isInValid} changeName={this.handleChangeName} />
                <ChangePassword onChange={this.handleInputOnChange}/>
                <button className={styles.button} >Сохранить</button>
            </div>
        );
    }
}
