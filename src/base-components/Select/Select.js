import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ValidatedSelect from '../ValidatedSelect/ValidatedSelect';

import styles from './Select.module.scss';

export default function Select({className, input, options}) {
    return (
        <ValidatedSelect input={input} selectClassName={cn(className, styles.select)} options={options}/>
    )
}

Select.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    options: PropTypes.array.isRequired
};

