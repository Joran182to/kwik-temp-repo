import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import cn from 'classnames';
import arrowImg from '../../assets/icons/arrow.svg';

import * as styles from './ValidatedSelect.module.scss';

export default function ValidatedSelect({input, options, selectClassName, optionRenderer, valueRenderer, searchable, valueProp}) {
    return (
        <Select
            {...input}
            onChange={(option) => option ? input.onChange(option.value) : ''}
            onBlur={() => input.onBlur()}
            clearable={false}
            onBlurResetsInput={false}
            options={options}
            placeholder={''}
            searchable={searchable}
            className={cn(styles.select, selectClassName)}
            optionRenderer={optionRenderer}
            valueRenderer={valueRenderer}
            arrowRenderer={({isOpen}) => (<img alt='' src={arrowImg} className={cn(styles.arrowIcon, {[styles.arrowIconOpened]: isOpen})}/>)}
        />
    )
}

ValidatedSelect.propTypes = {
    selectClassName: PropTypes.string,
    input: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string
    }))
};