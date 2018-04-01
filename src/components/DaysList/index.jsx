import React from 'react';
import styles from './styles.css';

const DaysList = ({ selectDay }) => {
    const dayPick = (evt) => {
        evt.preventDefault();
        const day = evt.target.id;
        const dayBtn = document.getElementById(day);
        dayBtn.classList.toggle(styles.dayBtnActive);
        selectDay(day);
    };
    return (
        <div className={styles.DaysList}>
            <button className={styles.day} id="mon1" onClick={dayPick} >Пн</button>
            <button className={styles.day} id="tue2" onClick={dayPick}>Вт</button>
            <button className={styles.day} id="wed3" onClick={dayPick}>Ср</button>
            <button className={styles.day} id="thu4" onClick={dayPick}>Чт</button>
            <button className={styles.day} id="fri5" onClick={dayPick}>Пт</button>
            <button className={styles.day} id="sat6" onClick={dayPick}>Сб</button>
            <button className={styles.day} id="sun0" onClick={dayPick}>Вс</button>
        </div>
    );
}

export default DaysList;
