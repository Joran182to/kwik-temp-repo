import React from 'react';
import {connect} from 'react-redux';
import QuotesTable from '../../components/QuotesTable/QuotesTable';
import Card from '../../../../base-components/Card/Card';
import {showMessage} from '../../../ui/actions';
import {messageTypes} from '../../../ui/constants';
import _find from 'lodash/find';

import styles from './SuccessPage.module.scss';

class QuotesPage extends React.Component {
    componentWillMount() {
        this.props.showMessage(messageTypes.ACCOUNT_INSURED, {userEmail: this.props.user.email, givenName: this.props.user.given_name});
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
        const { products, policies } = this.props;
        const purchasedProducts = products.map(product => {
            const relatedPolicy =  _find(policies, {productId: product.id});
            return {
                name: product.name,
                effectiveDate: relatedPolicy.effectiveDate,
                expiryDate: relatedPolicy.expirationDate || ' ',
                imageUrl: product.imageUrl
            }
        });

        return (
            <div className={styles.container}>
                <Card className={styles.card}>
                    <div className={styles.tableContainer}>
                        <QuotesTable
                            header={this.getTableHeaderCells()}
                            quotes={purchasedProducts}
                        />
                    </div>
                </Card>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        products: state.payment.purchasedProducts,
        policies: state.payment.purchasedPolicies,
        user: state.auth.user
    }),
    (dispatch) => ({
        showMessage: (type, props) => dispatch(showMessage(type, props))
    })
)(QuotesPage)