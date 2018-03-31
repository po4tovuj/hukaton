import React from 'react';
import styles from './styles.css';

const CategoryItem = ({categoryName, icon}) => (
<button className={styles.item}>
            <img src={icon} alt={categoryName} title="Выбрать категорию {categoryName}" className={styles.img} />
            <p className={styles.caption} >{categoryName}</p>
</button>

);

export default CategoryItem;
