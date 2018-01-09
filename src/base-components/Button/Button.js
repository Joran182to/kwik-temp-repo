import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import * as styles from './Button.module.scss';

export default function Button({className, type, onClick, disabled, children}) {
    return (
        <button
            className={cn(styles.button, {[styles.disabled]: disabled}, className)}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};