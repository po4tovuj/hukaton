import React from 'react';
import styles from './styles.css';

export const normalizeDate = (date) => {
    let currentDate = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
    let currentMonth = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
    return (`${currentDate}.${currentMonth}`);
};

export const calcDay = (currentDay, offset) => {
    let year = currentDay.getFullYear().toString();
    let month = currentDay.getMonth().toString();
    let date = currentDay.getDate().toString();
    let calculatedDay = new Date(year, month, date);
    calculatedDay.setDate(calculatedDay.getDate() + offset);
    return calculatedDay;
};

const DateField = () => {

    let day = new Date();
    let today = normalizeDate(day);
    let yesterday = normalizeDate(calcDay(day, -1));
    let beforeYesterday = normalizeDate(calcDay(day, -2));
    let tomorrow = normalizeDate(calcDay(day, 1));
    let afterTomorrow = normalizeDate(calcDay(day, 2));

    return (
        <div className={styles.wrapper}>
            <div className={styles.num}></div>
            <div className={styles.title}></div>
            <div className={styles.dates_wrapper}>
                <div className={styles.day}>{beforeYesterday}</div>
                <div className={styles.day}>{yesterday}</div>
                <div className={styles.day}>{today}</div>
                <div className={styles.day}>{tomorrow}</div>
                <div className={styles.day}>{afterTomorrow}</div>
                <div className={styles.basket}></div>
            </div>
        </div>
    );
};

export default DateField;
