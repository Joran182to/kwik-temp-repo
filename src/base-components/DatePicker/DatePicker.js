import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Datetime from 'react-datetime';
import calendarImg from '../../assets/icons/datepicker.svg';

import styles from './DatePicker.module.scss';

export default class DatePicker extends React.Component {
    render() {
        const {input: {value, onChange, onFocus, onBlur}, className, placeholder} = this.props;

        return (
            <div className={cn(styles.container, className)}>
                <Datetime
                    value={value}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    closeOnSelect={false}
                    timeFormat={false}
                    inputProps={{
                        placeholder,
                        className: styles.input
                    }}
                />
                <img src={calendarImg} className={styles.calendarImg} />
            </div>
        )
    }
}

DatePicker.propTypes = {};