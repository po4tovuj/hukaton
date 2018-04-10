import React from 'react';
import styles from './styles.css';
import {calcDay, normalizeDate} from '../DateField';
import {auth} from "../../firebase";

const Habit = (props) => {

    const {index, id, title, dayHabitState, onDelete, habitsDone} = props;

    const handleClick = (evt) => {
        let currentClass;
        if (evt.target.classList[1].slice(0, 18) === "styles__sign__todo") {
            currentClass = evt.target.classList[1];
            evt.target.classList.remove(currentClass);
            evt.target.classList.add(styles.sign__done);
        } else if (evt.target.classList[1] === "styles__sign__done" || evt.target.classList[1].slice(0, 18) === "styles__sign__done") {
            currentClass = evt.target.classList[1];
            evt.target.classList.remove(currentClass);
            evt.target.classList.add(styles.sign__todo);
        }
    };

    const handleBasketClick = (evt) => {
        evt.target.classList.toggle(styles.basket__orange);
        onDelete(auth.currentUser.uid, evt.target.id);
    };


    let day = new Date();
    let today_1 = calcDay(day, -1);
    let today_2 = calcDay(day, -2);
    let today__1 = calcDay(day, +1);
    let today__2 = calcDay(day, +2);

    const handleIconStyle = (checked) => {
        let style = [styles.sign];
        dayHabitState && dayHabitState[checked.getDay()] ? style = [...style, styles.sign__todo] : style = [...style, styles.sign__none];
        // let index = style.includes(styles.sign__todo);

        // if (checked < day && index > 0 && habitsDone[normalizeDate(checked)]) {
        //     style = style.slice(0, 1);
        //     style = [...style, styles.sign__done];
        // } else if (checked < day && index > 0 && !habitsDone[normalizeDate(checked)]) {
        //     style = style.slice(0, 1);
        //     style = [...style, styles.sign__not_done];
        // }
        return style.join(' ');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.number}> {index + 1} </div>
            <div className={styles.title}>{title}</div>
            <div className={handleIconStyle(today_2)}></div>
            <div className={handleIconStyle(today_1)}></div>
            <div className={handleIconStyle(day)} onClick={handleClick}></div>
            <div className={handleIconStyle(today__1)}></div>
            <div className={handleIconStyle(today__2)}></div>
            <div className={styles.basket} id={id} onClick={handleBasketClick}></div>
        </div>
    );
};

export default Habit;
