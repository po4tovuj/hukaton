import React from 'react';
import styles from './styles.css';

const Sidebar = ()=>({
    render() {
        const clickHandle = (evt) => {
            let chosenCategory = evt.target.id.slice(9);
            console.log(chosenCategory);
        };
        return (
            <div className={styles.sidebar}>
                <ul className={styles.category__wrapper}>
                    <li className={styles.category}>Привычки</li>
                        <ul className={styles.category__wrapper} onClick={clickHandle}>
                            <li className={styles.category__item} id="category-famyly"># Семья <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item} id="category-health"># Здоровье <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item} id="category-self-development"># Саморазвитие <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item} id="category-leisure"># Досуг <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item} id="category-environment"># Окружение <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item} id="category-finance"># Финансы <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item} id="category-career"># Карьера <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item} id="category-travels"># Путешествия <span className={styles.counter}>1</span></li>
                            <li className={styles.category__item} id="category-all"># Все <span className={styles.counter}>1</span></li>
                        </ul>
                    <li className={styles.category}>Сегодня</li>
                </ul>
            </div>
        );
    }
});

export default Sidebar;
