import React from 'react';
import styles from './styles.css';

const Sidebar = ()=>({
    render() {
        return (
            <div className={styles.sidebar}>
                <ul className={styles.category__wrapper}>
                    <li className={styles.category}>Привычки</li>
                        <ul className={styles.category__wrapper}>
                            <li className={styles.category__item}># Семья <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item}># Здоровье <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item}># Саморазвитие <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item}># Досуг <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item}># Окружение <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item}># Финансы <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item}># Карьера <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item}># Путешествия <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item}># Все <span className={styles.counter}>1</span></li>
                        </ul>
                    <li className={styles.category}>Сегодня</li>
                </ul>
            </div>
        );
    }
});

export default Sidebar;
