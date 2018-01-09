import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {userSessionPendingStates} from '../../../auth/constants';
import {cancelSurveyRequest} from '../../../survey/actions';
import {logout} from '../../../auth/actions';
import HeaderLogo from '../../components/HeaderLogo/HeaderLogo';
import Tabs from '../../../../base-components/Tabs/Tabs';
import HeaderActions from '../../components/HeaderActions/HeaderActions';

import styles from './Header.module.scss';

class Header extends React.Component {
    handleHeaderClick = () => {
        this.props.history.push('/');
    };

    isBuyTabActive = () => {
      const pathname = this.props.history.location.pathname;
      return (pathname === '/demographic-form')
          || (pathname === '/survey')
          || (pathname === '/quotes')
          || (pathname === '/purhase-plan')
    };

    isServiceTabActive = () => {
        const pathname = this.props.history.location.pathname;
        return (pathname === '/profile/address')
            || (pathname === '/profile/dashboard')
            || (pathname === '/profile/phone')
            || (pathname === '/profile/payment')
            || (pathname === '/profile/contact-us');
    };

    isClaimsTabActive = () => {
        const pathname = this.props.history.location.pathname;
        return (pathname === '/claims')
            || (pathname === '/report-claim');
    };

    handleCancelSurveyClick = () => {
        const {cancelSurvey, history} = this.props;

        cancelSurvey({history});
    };

    render() {
        const {isLoggedIn, userName, logout, cartActive, session, hasPendingProducts} = this.props;
        let buyLink = '/demographic-form';
        if (session.pendingState === userSessionPendingStates.PRODUCT_SELECTION ) {
            buyLink = '/quotes'
        } else if (session.pendingState === userSessionPendingStates.SURVEY) {
            buyLink = '/survey'
        }

        const tabs = [
            ((session.pendingState === userSessionPendingStates.PRODUCT_SELECTION) && !hasPendingProducts)
                ? {title: 'BUY', onClick: this.handleCancelSurveyClick, isActive: this.isBuyTabActive()}
                : {title: 'BUY', link: buyLink, isActive: this.isBuyTabActive()},
            {title: 'SERVICE', link: '/profile/dashboard', isActive: this.isServiceTabActive(),  dropdown: [
                {link: '/profile/dashboard', title: 'Dashboard'},
                {link: '/profile/address', title: 'Address'},
                {link: '/profile/phone', title: 'Phone'},
                {link: '/profile/payment', title: 'Payment Method'},
                {link: '/profile/contact-us', title: 'Contact Us'}
            ]
            },
            {title: 'CLAIMS', link: '/report-claim', isActive: this.isClaimsTabActive(), dropdownClassName: styles.claimsDropdown, dropdown: [
                {link: '/claims', title: 'Claim Dashboard'},
                {link: '/report-claim', title: 'Report Claim'}
            ]
            }
        ];

        return (
            <div className={styles.header}>
                <div className={styles.inner}>
                    <HeaderLogo className={styles.logo} onClick={this.handleHeaderClick}/>
                    <Tabs items={tabs} className={styles.tabs}/>
                    <HeaderActions
                        className={styles.actions}
                        isLoggedIn={isLoggedIn}
                        userName={userName}
                        onLogoutClick={logout}
                        cartActive={cartActive}
                        signInLink='/login'
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    (state) => ({
        session: state.auth.userSession,
        isLoggedIn: state.auth.isLoggedIn,
        userName: state.auth.user.given_name,
        cartActive: state.quotes.cart ? state.quotes.cart.length : false,
        hasPendingProducts: state.quotes.hasPendingProducts
    }),
    (dispatch) => ({
        logout: () => dispatch(logout()),
        cancelSurvey: (payload) => dispatch(cancelSurveyRequest(payload))
    })
)(Header));