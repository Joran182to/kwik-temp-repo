import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Select from '../../../../base-components/Select/Select';

import styles from './SurveyDropdown.module.scss';

export default function SurveyDropdown({className, input, choices}) {
    return (
        <Select
            options={choices.map(choice => ({value: choice.id.value, label: choice.title}))}
            input={input}
            className={cn(styles.dropdown, className)}
        />
    )
}

SurveyDropdown.propTypes = {
    className: PropTypes.string,
    input: PropTypes.object
};

