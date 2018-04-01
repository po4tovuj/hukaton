import React from 'react';
import styles from './styles.css';

const Habit = () => ({
    render() {
        const handleClick = (evt) => {
            console.log(evt.target.classList[1].slice(0, 18) === "styles__sign__todo");
            let currentClass;
            if(evt.target.classList[1].slice(0, 18) === "styles__sign__todo") {
                currentClass = evt.target.classList[1];
                evt.target.classList.remove(currentClass);
                evt.target.classList.add(styles.sign__done);
            } else if (evt.target.classList[1] === "styles__sign__done" || evt.target.classList[1].slice(0, 18) === "styles__sign__done" ) {
                currentClass = evt.target.classList[1];
                evt.target.classList.remove(currentClass);
                evt.target.classList.add(styles.sign__todo);
            }
        };

        return (
            <div className={styles.wrapper}>
                <div className={styles.number}>1.</div>
                <div className={styles.title}>Качать прес</div>
                <div className={[styles.sign, styles.sign__not_done].join(' ')}></div>
                <div className={[styles.sign, styles.sign__done].join(' ')}></div>
                <div className={[styles.sign, styles.sign__todo].join(' ')} onClick={handleClick}></div>
                <div className={[styles.sign, styles.sign__none].join(' ')}></div>
                <div className={[styles.sign, styles.sign__todo].join(' ')}></div>
                <div className={styles.basket}></div>
            </div>
        );
    }
});

export default Habit;
