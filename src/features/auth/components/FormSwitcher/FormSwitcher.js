import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Checkbox from '../../../../base-components/Checkbox/Checkbox';

import * as styles from './FormSwitcher.module.scss';

export default function FormSwitcher({className, isSignUpForm, isSignInForm}) {
    return (
        <div className={cn(styles.container, className)}>
            <Link to='/signup' className={styles.link} tabIndex={-1}>
                <Checkbox className={styles.checkbox} isChecked={isSignUpForm}/>
                New User
            </Link>
            <Link to='/login' className={styles.link} tabIndex={-1}>
                <Checkbox className={styles.checkbox} isChecked={isSignInForm}/>
                Returning User
            </Link>
        </div>
    )
}

FormSwitcher.propTypes = {
    isSignUpForm: PropTypes.bool,
    isSignInForm: PropTypes.bool,
    className: PropTypes.string
};