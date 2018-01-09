import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import SelectMultiple from '../../../../base-components/SelectMultiple/SelectMultiple';

import styles from './SurveyTag.module.scss';

export default function SurveyTag({className, input, choices}) {
    return (
        <SelectMultiple
            options={choices.map(choice => ({value: choice.id.value, label: choice.title}))}
            input={input}
            selectClassName={cn(styles.select, className)}
        />
    )
}

SurveyTag.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object
};

