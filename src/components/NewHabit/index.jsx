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
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleOpenModal();
    };

    handleClick = (event) => {
        event.preventDefault();
        console.log("Click!!");
        this.props.handleOpenModal();
    };

    render() {
        return (
            <button onClick={ this.handleClick } >
                <span className={styles.buttonAdd}>+</span> Добавить привычку
            </button >
        );
    }
}

// <div className={styles.NewHabits}>
{/* <form className={styles.form} onSubmit={this.handleSubmit}> */ }
{/* <input type="text" className={styles.inputText} placeholder="Добавить привычку" onChange={this.handleInputValue} /> */ }
{/* </form> */ }
{/* </div> */ }
