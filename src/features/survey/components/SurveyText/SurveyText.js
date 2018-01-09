import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './SurveyText.module.scss';

export default function SurveyText({className, input}) {
    return (
        <textarea
            {...input}
            className={cn(styles.textarea, className)}
            placeholder='Please provide more details here'
        />
    )
}

SurveyText.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object
};

