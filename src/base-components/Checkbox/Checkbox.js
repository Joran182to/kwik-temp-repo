import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import checkImg from '../../assets/icons/check-white.svg';

import * as styles from './Checkbox.module.scss';

export default class Checkbox extends React.Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {isChecked, onCheck, onUncheck} = this.props;

        if (isChecked && onUncheck) onUncheck();
        if (!isChecked && onCheck) onCheck();
    }

    render() {
        const {className, isChecked} = this.props;

        return (
            <div className={cn(styles.checkbox, {[styles.checked]: isChecked}, className)} onClick={this.handleClick}>
                {
                    isChecked && <img src={checkImg} className={styles.checkImg} alt=''/>
                }
            </div>
        )
    }
}

Checkbox.propTypes = {
    className: PropTypes.string,
    isChecked: PropTypes.bool,
    onCheck: PropTypes.func,
    onUncheck: PropTypes.func
};