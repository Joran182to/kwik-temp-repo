import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ValidatedInput from '../../../../base-components/ValidatedInput/ValidatedInput';

import styles from './FormInput.module.scss';

export default function FormInput({className, input, type, min}) {
    return (
        <ValidatedInput input={input} type={type} min={min} inputClassName={cn(className, styles.input)}/>
    )
}

FormInput.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object
};

