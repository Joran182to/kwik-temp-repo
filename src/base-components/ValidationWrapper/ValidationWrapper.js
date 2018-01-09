import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import * as styles from './ValidationWrapper.module.scss';

export default function ValidationWrapper(props) {
    const {placeholder, inputWrapperClassName, className, refName, additionalButton, input: {value}, meta: { active, touched, error }} = props;

    return (
        <div className={cn(styles.container, {[styles.hasValidationError]: touched && error}, className)}>
            <div className={styles.innerContainer}>
                <div className={styles.placeholderAndInputContainer}>
                    <div className={cn(styles.placeholder, {[styles.pinnedToTop]: value || active})}>
                        {placeholder}
                    </div>
                    <div className={cn(styles.input, inputWrapperClassName)} ref={refName}>
                        {props.children(props)}
                    </div>
                    {additionalButton}
                </div>

                {touched && error && <div className={styles.validationError}>{error}</div>}
            </div>
        </div>
    )
}

ValidationWrapper.propTypes = {
    input: PropTypes.object,
    meta: PropTypes.object,
    className: PropTypes.string,
    placeholder: PropTypes.string,
};