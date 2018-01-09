import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import * as styles from './ListItem.module.scss';

export default function ListItem({className, number, children}) {
    return (
        <div className={cn(styles.container, className)}>
            <div className={styles.number}>{number}</div>
            <div>{children}</div>
        </div>
    )
}

ListItem.propTypes = {
    className: PropTypes.string,
    number: PropTypes.number.isRequired
};