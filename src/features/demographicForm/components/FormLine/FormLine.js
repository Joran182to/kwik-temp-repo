import React from 'react';

import styles from './FormLine.module.scss';

export default function FormLine({children}) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}