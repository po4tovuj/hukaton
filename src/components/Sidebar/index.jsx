import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './styles.css';

const categories = [
    {
        name: 'family',
        text: 'Семья',
    },
    {
        name: 'health',
        text: 'Здоровье',
    },
    {
        name: 'self-development',
        text: 'Саморазвитие',
    },
    {
        name: 'hobbys',
        text: 'Досуг',
    },
    {
        name: 'environment',
        text: 'Окружение',
    },
    {
        name: 'finance',
        text: 'Финансы',
    },
    {
        name: 'carrier',
        text: 'Карьера',
    },
    {
        name: 'voyage',
        text: 'Путешествия',
    },
];

const Sidebar = ({userId, match, habitsCounter, onCategoryClick, onGetAllClick}) => {

        return (
            <section className={styles.sidebar}>
                <h2 className={styles.title}>Привычки</h2>
                <ul className={styles.category__wrapper}>
                    {categories.map(category => (
                        <li
                            key={category.name}
                            className={styles.category__item}
                            onClick={()=> onCategoryClick(category.name)}
                        >
                            {/* FIXME: заменить ID на query string
                https://www.npmjs.com/package/query-string*/}
                            <NavLink
                                to={{
                                    pathname: `${match.url}`,
                                    search: `?category=${category.name}`,
                                }}>
                                # {category.text}
                            </NavLink>
                            <span className={styles.counter}>{habitsCounter[category.name]}</span>
                        </li>
                    ))}
                </ul>
                <NavLink
                    to={{
                        pathname: `${match.url}`,
                        search: `?category=all&today=true`,
                    }}>
                    <p className={styles.title} onClick={onGetAllClick}>Сегодня</p>
                </NavLink>
            </section>
        );
};

export default Sidebar;
