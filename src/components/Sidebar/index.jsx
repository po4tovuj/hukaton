import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';
import {getDataByCategory} from "../../firebase";

const Sidebar = ({userId, match, habits})=>({
    render() {
        const countHabit = (category) => {
            console.log("trying: ", getDataByCategory(userId, category));
            const counter = Object.values(getDataByCategory(userId, category));
            return counter.length || '0';
        };

        return (
            <div className={styles.sidebar}>
            <ul className={styles.category__wrapper}>
                <li className={styles.category}>Привычки</li>
                <ul className={styles.category__wrapper}>
                    <li className={styles.category__item} id="category-family"><NavLink to={`${match.url}/family`} >
                        # Семья
                        </NavLink><span className={styles.counter}>
                        {countHabit('family')}
                        </span>
                    </li>
                    <li className={styles.category__item} id="category-health"><NavLink to={`${match.url}/health`} >
                        # Здоровье
                        </NavLink><span className={styles.counter}>{countHabit('health')}</span>
                    </li>
                    <li className={styles.category__item} id="category-self-development"><NavLink to={`${match.url}/self-development`} >
                        # Саморазвитие
                        </NavLink><span className={styles.counter}>{countHabit('self-development')}</span>
                    </li>
                    <li className={styles.category__item} id="category-leisure"><NavLink to={`${match.url}/leisure`} >
                        # Досуг
                        </NavLink><span className={styles.counter}>{countHabit('leisure')}</span>
                    </li>
                    <li className={styles.category__item} id="category-environment"><NavLink to={`${match.url}/environment`} >
                        # Окружение
                        </NavLink><span className={styles.counter}>{countHabit('environment')}</span>
                    </li>
                    <li className={styles.category__item} id="category-finance"><NavLink to={`${match.url}/finance`} >
                        # Финансы
                        </NavLink><span className={styles.counter}>{countHabit('finance')}</span>
                    </li>
                    <li className={styles.category__item} id="category-career"><NavLink to={`${match.url}/career`} >
                        # Карьера
                        </NavLink><span className={styles.counter}>{countHabit('career')}</span>
                    </li>
                    <li className={styles.category__item} id="category-travels"><NavLink to={`${match.url}/travels`} >
                        # Путешествия
                        </NavLink><span className={styles.counter}>{countHabit('travels')}</span>
                    </li>
                    <li className={styles.category__item} id="category-all"><NavLink to={`${match.url}/all`} >
                        # Все
                        </NavLink><span className={styles.counter}>{habits.length}</span>
                    </li>
                </ul>
                <li className={styles.category}>Сегодня</li>
            </ul>
        </div>
        );
    }
});

export default Sidebar;
