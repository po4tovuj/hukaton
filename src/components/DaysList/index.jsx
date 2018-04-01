import React from 'react';
import styles from './styles.css';

const DaysList = () => {

    return (
        <div className={styles.DaysList}>
            <button className={styles.day} id="mon">Пн</button>
            <button className={styles.day} id="tue">Вт</button>
            <button className={styles.day} id="wed">Ср</button>
            <button className={styles.day} id="thu">Чт</button>
            <button className={styles.day} id="fri">Пт</button>
            <button className={styles.day} id="sat">Сб</button>
            <button className={styles.day} id="sun">Вс</button>
        </div>
    );
}

export default DaysList;
