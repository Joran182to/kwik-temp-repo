import React from 'react';
import {connect} from 'react-redux';
import {getClaims} from '../../actions';
import QuotesTable from '../../../quotes/components/QuotesTable/QuotesTable';
import Card from '../../../../base-components/Card/Card';

import styles from '../../../quotes/containers/QuotesPage/QuotesPage.module.scss';

class ClaimList extends React.Component {
    componentWillMount() {
        this.props.getClaims();
    }

    getTableHeaderCells = () => {
        return [
            <div className={styles.productName}>PRODUCT</div>,
            <div className={styles.premiumHeadingCell}>CLAIM DATE</div>,
            <div className={styles.premiumHeadingCell}>DESCRIPTION</div>,
            <div className={styles.premiumHeadingCell}>NEXT UPDATE</div>,
            <div className={styles.premiumHeadingCell}>STATUS</div>
        ]
    };

    render() {
        const {claims} = this.props;

        return <div className={styles.container}>
            <div className={styles.title}>Claim Dashboard</div>
            <Card className={styles.card}>
                <div className={styles.tableContainer}>
                    <QuotesTable
                        header={this.getTableHeaderCells()}
                        quotes={claims.map(claim => ({
                                name: claim.id,
                                description: claim.desc,
                                date: claim.date,
                                updateDate: claim.nextUpdateDate || ' ',
                                status: claim.status
                            }))}
                    />
                </div>
            </Card>
        </div>
    }
}

ClaimList = connect(
    state => ({
        claims: state.claim.claims
    }),
    dispatch => ({
        getClaims: () => dispatch(getClaims())
    })
)(ClaimList);

export default ClaimList;