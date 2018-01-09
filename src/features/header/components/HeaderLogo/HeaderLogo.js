import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import logoImg from '../../../../assets/images/logo.svg';

import styles from './HeaderLogo.module.scss';

export default function HeaderLogo({className, onClick}) {
    return (
        <img alt='logo' src={logoImg} className={cn(styles.logoImg, className)} onClick={onClick}/>
    )
}

HeaderLogo.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};