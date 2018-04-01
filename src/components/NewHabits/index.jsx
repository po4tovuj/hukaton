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
        this.props.handleOpenModal();
    }

    handleClick = (event) => {
        event.preventDefault();
        console.log("Click!!");
        this.props.handleOpenModal();
    }

    render() {
        return (
            <div className={styles.NewHabits}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <button className={styles.buttonAdd} onClick={this.handleClick}>+</button>
                    <span className={styles.inputText}>Добавить привычку</span>
                </form>
            </div>
        );
    }
}
