import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './styles.css';
import {getDataByCategory} from '../../firebase';

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

const Sidebar = ({userId, match, habitsCounter, onCategoryClick}) => ({
    render() {

        // TODO: на кой ляд тут id
        return (
            <section className={styles.sidebar}>
                <h2 className={styles.title}>Привычки</h2>
                <ul className={styles.category__wrapper}>
                    {categories.map(c => (
                        <li
                            key={c.name}
                            className={styles.category__item}
                            id={`category-${c.name}`}
                            onClick={()=> onCategoryClick(c.name)}
                        >
                            {/* FIXME: заменить ID на query string
              Но сначала вынести все в Home
                https://www.npmjs.com/package/query-string
              */}
                            <NavLink
                                to={{
                                    pathname: `${match.url}/${c.name}`,
                                    // search: `?category=${c.name}`,
                                }}>
                                # {c.text}
                            </NavLink>
                            <span className={styles.counter}>{habitsCounter[c.name]}</span>
                        </li>
                    ))}
                </ul>
                <p className={styles.title}>Сегодня</p>
            </section>
        );
    },
});

export default Sidebar;
