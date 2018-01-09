import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './SurveyRadio.module.scss';

export default function SurveyRadio({className, input, choices}) {
    return (
        <div className={cn(styles.container, className)}>
            {choices.map(choice => {
                const isChecked = input.value === choice.id;
                return (
                    <div
                        className={cn(styles.radioContainer, {[styles.checked]: isChecked})}
                        key={choice.id}
                        onClick={() => input.onChange(choice.id)}
                    >
                        <div className={styles.radio}>
                            {isChecked && <div className={styles.checkedCircle}></div> }
                        </div>
                        <div className={styles.radioLabel}>{choice.title}</div>
                    </div>
                )
            })}
        </div>
    )
}

SurveyRadio.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object,
    choices: PropTypes.array.isRequired
};

