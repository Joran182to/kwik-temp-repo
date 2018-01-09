import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ProfileTabs from '../ProfileTabs/ProfileTabs';
import Card from '../../../../base-components/Card/Card';
import {profileTabs} from '../../constants';

import styles from './ProfileComponent.module.scss';

export default function ProfileComponent({activeTab, actionButton, children, className}) {
    const tabs = [
        {title: 'DASHBOARD', link: '/profile/dashboard', isActive: activeTab === profileTabs.DASHBOARD},
        {title: 'ADDRESS', link: '/profile/address', isActive: activeTab === profileTabs.ADDRESS},
        {title: 'PHONE', link: '/profile/phone', isActive: activeTab === profileTabs.PHONE},
        {title: 'PAYMENT METHOD', link: '/profile/payment', isActive: activeTab === profileTabs.PAYMENT_METHOD},
        // {title: 'BENEFICIARY', link: '/profile/beneficiary', isActive: activeTab === profileTabs.BENEFICIARY},
        {title: 'CONTACT US', link: '/profile/contact-us', isActive: activeTab === profileTabs.CONTACT_US}
    ];

    return (
        <div className={styles.container}>
            <div className={styles.title}>Your Profile</div>
            <Card className={styles.card}>
                <ProfileTabs items={tabs}/>
                <div className={cn(styles.cardInner, className)}>
                    {children}
                </div>
            </Card>
            <div className={styles.buttonContainer}>{actionButton}</div>
        </div>
    )
}

ProfileComponent.propTypes = {
    activeTab: PropTypes.string.isRequired,
    actionButton: PropTypes.node
};