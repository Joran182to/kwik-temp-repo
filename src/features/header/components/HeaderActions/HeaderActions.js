import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import DropdownMenu from '../../../../base-components/DropdownMenu/DropdownMenu';
import Button from '../../../../base-components/Button/Button';
import cartImg from '../../../../assets/icons/cart-grey.svg';
import cartActiveImg from '../../../../assets/icons/cart-active.svg';
import notificationsImg from '../../../../assets/icons/bell-grey.svg';
import helpImg from '../../../../assets/icons/help-black.svg';

import styles from './HeaderActions.module.scss';

export default function HeaderActions({className, userName, isLoggedIn, signInLink, onLogoutClick, cartActive}) {
    return (
        <div className={cn(styles.container, className)}>
            {
                isLoggedIn
                    ? <DropdownMenu
                        title={<div className={styles.dropdownTitle}>{`Hi, ${userName}`}</div>}
                        content={<div className={styles.dropdownMenu}>
                            <Button className={styles.logoutButton} onClick={onLogoutClick}>Logout</Button>
                        </div>}/>
                    : <Link to={signInLink} className={styles.signInLink}>SIGN IN</Link>
            }
            <div className={styles.divider}></div>
            <Link className={styles.cartButton} to={('/cart')}><img alt='' src={cartActive ? cartActiveImg : cartImg} className={styles.cartImg}/>{cartActive ? <span className={styles.cartNumber}>{cartActive}</span> : null}</Link>
            <Button className={styles.notificationsButton} onClick={() => ({})}><img alt='' src={notificationsImg} className={styles.notificationsImg}/></Button>
            <Button className={styles.helpButton} onClick={() => ({})}><img alt='' src={helpImg} className={styles.helpImg}/></Button>
        </div>
    )
}

HeaderActions.propTypes = {
    className: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
    userName: PropTypes.string,
    signInLink: PropTypes.string,
    onLogoutClick: PropTypes.func.isRequired
};