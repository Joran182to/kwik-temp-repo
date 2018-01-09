import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {roundToExactly} from '../../helpers/roundTo';

import styles from './MonthlyPrice.module.scss';

export default function MonthlyPrice({price, className, skipMonth = false}) {
    const roundedPrice = roundToExactly(price, 2);
    const [mainNumber, decimals] = String(roundedPrice).split('.');

    return (
        <div className={cn(styles.container, className)}>
            <div className={styles.mainNumber}>${mainNumber}</div>
            <div className={styles.decimals}>.{decimals}</div>
            {!skipMonth ? <div className={styles.monthlyTitle}>.mo</div> : null}
        </div>
    )
}

MonthlyPrice.propTypes = {
    className: PropTypes.string,
    price: PropTypes.number.isRequired
};