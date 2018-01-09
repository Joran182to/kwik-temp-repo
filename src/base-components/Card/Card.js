import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import * as styles from './Card.module.scss';

export default function Card({className, children}) {

    return (
        <div className={cn(styles.card, className)}>
            {children}
        </div>
    )
};

Card.propTypes = {
    className: PropTypes.string
};