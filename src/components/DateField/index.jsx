import React from 'react';
import styles from './styles.css';

const DateField = () => {

    const normalizeDate = (date) => {
        let currentDate = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        let currentMonth = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`;
        return (`${currentDate}.${currentMonth}`);
    };

    const calcDay = (currentDay, offset) => {
        let year = currentDay.getFullYear().toString();
        let month = currentDay.getMonth().toString();
        let date = currentDay.getDate().toString();
        let calculatedDay = new Date(year,month,date);
        calculatedDay.setDate(calculatedDay.getDate() + offset);
        return normalizeDate(calculatedDay);
    };

    let day = new Date();
    let today = normalizeDate(day);
    let yesterday = calcDay(day, -1);
    let beforeYesterday = calcDay(day, -2);
    let tomorrow = calcDay(day, 1);
    let afterTomorrow = calcDay(day, 2);

    return (
        <div className={styles.wrapper}>
            <div className={styles.day}>{beforeYesterday}</div>
            <div className={styles.day}>{yesterday}</div>
            <div className={styles.day}>{today}</div>
            <div className={styles.day}>{tomorrow}</div>
            <div className={styles.day}>{afterTomorrow}</div>
        </div>
    );
};

export default DateField;
