import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './FormItem.module.scss';

export default function FormItem({title, description, input}) {
    return (
        <div className={styles.container}>
            <div className={styles.titleAndInputContainer}>
                <div className={styles.title}>{title}</div>
                <div className={styles.inputContainer}>{input}</div>
            </div>
            <div className={styles.description}>{description}</div>
        </div>
    )
}

FormItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    input: PropTypes.node.isRequired
};