import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import checkImg from '../../../../assets/icons/check-white.svg';

import styles from './SurveyCheckbox.module.scss';

export default function SurveyCheckbox({className, checkboxClassName, input, choices}) {
    const isOneColumnChoices = choices.length > 3;

    return (
        <div className={cn(styles.container, className, {[styles.oneColumnChoices]: isOneColumnChoices})}>
            {choices.map(choice => {
                const isChecked = [...input.value].indexOf(choice.id) > -1;
                return (
                    <div
                        className={cn(styles.checkboxContainer, checkboxClassName, {[styles.checked]: isChecked, [styles.fullWidthCheckboxContainer]: isOneColumnChoices})}
                        key={choice.id}
                        onClick={() => {
                            const newValue = [...input.value];

                            if (isChecked) {
                                newValue.splice(newValue.indexOf(choice.id), 1);
                            } else {
                                newValue.push(choice.id);
                            }

                            return input.onChange(newValue);
                        }}
                    >
                        <div className={styles.checkbox}>
                            {isChecked && <img alt='' src={checkImg} className={styles.checkImg} /> }
                        </div>
                        <div className={styles.checkboxLabel}>{choice.title}</div>
                    </div>
                )
            })}
        </div>
    )
}

SurveyCheckbox.propTypes = {
    className: PropTypes.string,
    checkboxClassName: PropTypes.string,
    input: PropTypes.object,
    choices: PropTypes.array.isRequired
};

