import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Habit = () => ({
    render() {



        const handleClick = (evt) => {
            console.log(evt.target.classList.value.slice(0, 25) === "styles__habit__sign__todo");
        };

        return (
            <div className={styles.wrapper}>
                <div className={styles.number}>1.</div>
                <div className={styles.title}>Качать прес</div>
                <div className={styles.sign__todo} onClick={handleClick}></div>
                <div className={styles.sign__todo__done} onClick={handleClick}></div>
                <div className={styles.sign__none} onClick={handleClick}></div>
                <div className={styles.sign__not_done} onClick={handleClick}></div>
                <div className={styles.sign__todo__done} onClick={handleClick}></div>
                <div className={styles.basket}></div>
            </div>
        );
    }
});

export default Habit;
