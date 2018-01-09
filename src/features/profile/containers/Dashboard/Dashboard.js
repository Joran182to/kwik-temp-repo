import React from 'react';
import {connect} from 'react-redux';
import {getUserPlansRequest} from '../../actions';
import ProfileComponent from '../../components/ProfileComponent/ProfileComponent';
import {profileTabs} from '../../constants';
import QuotesTable from '../../../quotes/components/QuotesTable/QuotesTable';
import _find from 'lodash/find';

import styles from '../../../quotes/containers/SuccessPage/SuccessPage.module.scss';
import dashboardStyles from './Dashboard.module.scss';

class Dashboard extends React.Component {
    componentWillMount() {
        this.props.getUserPlans();
    }

    getTableHeaderCells = () => {
        return [
            '',
            <div className={styles.nameOfPlanHeadingCell}>NAME OF PLAN</div>,
            <div className={styles.dateHeadingCell}>EFFECTIVE</div>,
            <div className={styles.dateHeadingCell}>EXPIRING</div>
        ]
    };

    render() {
        const { userPlans, products } = this.props;
        const purchasedProducts = products && userPlans.length ? products.map(product => {
            const relatedPolicy =  _find(userPlans, {productId: product.id});
            return {
                name: product.name,
                effectiveDate: relatedPolicy ? relatedPolicy.effectiveDate : ' ',
                expiryDate: relatedPolicy ? relatedPolicy.expirationDate || ' ' : ' ',
                imageUrl: product.imageUrl
            }
        }) : [];

        return <ProfileComponent activeTab={profileTabs.DASHBOARD}>
            <QuotesTable
                header={this.getTableHeaderCells()}
                className={dashboardStyles.fullWidth}
                quotes={purchasedProducts}
            />
        </ProfileComponent>

    }
}

Dashboard = connect(
    state => {
        let userPlans = state.profile.plans.slice();
        let products =  state.auth.userSession.purchasedProducts.slice();
        if (state.payment.purchasedPolicies.length) {
            userPlans = userPlans.concat(state.payment.purchasedPolicies);
        }

        if (state.payment.purchasedProducts.length) {
            products = products.concat(state.payment.purchasedProducts);
        }

        return {
            userPlans,
            products
        }
    },
    dispatch => ({
        getUserPlans: () => dispatch(getUserPlansRequest())
    })
)(Dashboard);

export default Dashboard;