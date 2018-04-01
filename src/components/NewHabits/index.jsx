import React, { Component } from 'react';
import styles from './style.css';

export default class NewHabits extends Component {

    state = {
        inputValue: ''
    };

    handleInputValue = (event) => {
        const value = event.target.value;
        this.setState({
            inputValue: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className={styles.NewHabits}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <input type="submit" className={styles.buttonAdd} value="+" />
                    <span className={styles.formText} onChange={this.handleInputValue}>Добавить привычку</span>
                </form>
            </div>
        );
    }
}
