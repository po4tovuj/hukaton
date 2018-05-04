import styles from './styles.css';

import React from 'react';

const Title = ({title}) => {
  return (
    <p className={styles.title}>
        {title}
    </p>
  );
};

export default Title;

