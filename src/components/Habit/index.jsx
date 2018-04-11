import React from 'react';
import styles from './styles.css';
import {calcDay} from '../DateField';
import {auth} from "../../firebase";
import {habitsDbRef} from "../../firebase/firebase";

const Habit = (props) => {

    const {index, id, habitObj, onDelete } = props;
    const { habitId, title, category, duration, habitsDone, startDate } = habitObj;

    let day = new Date();
    let today_1 = calcDay(day, -1);
    let today_2 = calcDay(day, -2);
    let today__1 = calcDay(day, +1);
    let today__2 = calcDay(day, +2);

    const handleClick = (evt) => {
        let currentClass;
        if (evt.target.classList[1].slice(0, 18) === "styles__sign__todo") {
            let update = {
                ...habitsDone,
                [day.setHours(0,0,0,0)] : true,
            };
            habitsDbRef.child(auth.currentUser.uid + '/' + category + '/' + habitId + '/habitsDone').set(update);
            currentClass = evt.target.classList[1];
            evt.target.classList.remove(currentClass);
            evt.target.classList.add(styles.sign__done);
        } else if (evt.target.classList[1] === "styles__sign__done" || evt.target.classList[1].slice(0, 18) === "styles__sign__done") {
            let unUpdate = {
                ...habitsDone,
                [day.setHours(0,0,0,0)] : false,
            };
            habitsDbRef.child(auth.currentUser.uid + '/' + category + '/' + habitId + '/habitsDone').set(unUpdate);
            currentClass = evt.target.classList[1];
            evt.target.classList.remove(currentClass);
            evt.target.classList.add(styles.sign__todo);
        }
    };

    const handleBasketClick = (evt) => {
        evt.target.classList.toggle(styles.basket__orange);
        onDelete(auth.currentUser.uid, category + '/' + evt.target.id);
    };

    const handleIconStyle = (checked) => {
        let style = [styles.sign];

        startDate <= Date.parse(checked) && duration && duration[checked.getDay()]
            ? style = [...style, styles.sign__todo]
            : style = [...style, styles.sign__none];

        let index = style.includes(styles.sign__todo);

        let habitWasMade = habitsDone && habitsDone[checked.setHours(0,0,0,0)];

        if (checked < day && index > 0 && habitWasMade) {
            style = style.slice(0, 1);
            style = [...style, styles.sign__done];
        } else if (checked < day && index > 0) {
            style = style.slice(0, 1);
            style = [...style, styles.sign__not_done];
        }
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
