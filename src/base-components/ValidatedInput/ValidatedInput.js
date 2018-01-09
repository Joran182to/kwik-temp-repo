import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './ValidatedInput.module.scss';

export default function ValidatedInput({input, type, inputClassName, refName, min}) {
    return (
        <input
            {...input}
            type={type}
            min={min}
            className={cn(styles.input, inputClassName)}/>
    )
}

ValidatedInput.propTypes = {
    input: PropTypes.object,
    type: PropTypes.string,
    inputClassName: PropTypes.string
};
