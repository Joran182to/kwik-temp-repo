import React from 'react';
import {connect} from 'react-redux';
import HomePageCard from '../../components/HomePageCard/HomePageCard';
import ListItem from '../../components/ListItem/ListItem';
import cartImg from '../../../../assets/icons/cart.svg';
import serviceImg from '../../../../assets/icons/service.svg';
import claimImg from '../../../../assets/icons/claim.svg';
import alertImg from '../../../../assets/icons/alert.svg';
import dashboardImg from '../../../../assets/icons/dashboard.svg';
import reviewImg from '../../../../assets/icons/review-claim.svg';
import editImg from '../../../../assets/icons/edit.svg';
import CompleteSurveyMessage from '../../components/CompleteSurveyMessage/CompleteSurveyMessage';
import QuotesAvailableMessage from '../../components/QuotesAvailableMessage/QuotesAvailableMessage';
import {userSessionPendingStates} from '../../../auth/constants';
import {cancelSurveyRequest} from '../../../survey/actions';

import styles from './HomePage.module.scss';

class HomePage extends React.Component {
    constructor() {
        super();

        this.state = {
            isCompleteSurveyMessageClosed: false,
            isQuotesAvailableMessageClosed: false
        };
    }

    handleCloseCompleteSurveyMessageClick = () => {
        this.setState({isCompleteSurveyMessageClosed: true});
    };

    handleCloseQuotesAvailableMessageClick = () => {
        this.setState({isQuotesAvailableMessageClosed: true});
    };

    handleCompleteSurveyClick = () => {
        this.props.history.push('/survey');
    };

    handleShowQuotesClick = () => {
        this.props.history.push('/quotes');
    };

    handleCancelSurveyClick = () => {
        const {cancelSurvey, history} = this.props;

        cancelSurvey({history});
    };

    render() {
        const {history, userName, pendingState, hasPendingProducts} = this.props;
        let buyLink = '/demographic-form';
        if ((pendingState === userSessionPendingStates.PRODUCT_SELECTION) && hasPendingProducts) {
            buyLink = '/quotes'
        } else if (pendingState === userSessionPendingStates.SURVEY) {
            buyLink = '/survey'
        }

        return (
            <div className={styles.container}>

                {
                    ((pendingState === userSessionPendingStates.SURVEY) && !this.state.isCompleteSurveyMessageClosed)
                        && <CompleteSurveyMessage
                            className={styles.completeSurveyMessage}
                            userName={userName}
                            onClose={this.handleCloseCompleteSurveyMessageClick}
                            onCompleteSurvey={this.handleCompleteSurveyClick}
                            onCancelSurvey={this.handleCancelSurveyClick}
                        />
                }
                {
                    (((pendingState === userSessionPendingStates.PRODUCT_SELECTION) && hasPendingProducts) && !this.state.isQuotesAvailableMessageClosed)
                        && <QuotesAvailableMessage
                            className={styles.quotesAvailableMessage}
                            userName={userName}
                            onClose={this.handleCloseQuotesAvailableMessageClick}
                            onShowQuotes={this.handleShowQuotesClick}
                        />
                }
                <div className={styles.cardsContainer}>
                    <HomePageCard
                        className={styles.card}
                        icon={<img alt='' src={cartImg} className={styles.cardBuyIcon}/>}
                        iconTitle='BUY'
                        title='Buying an insurance is as simple as 1 2 3'
                        body={<div>
                            <ListItem number={1} className={styles.paragraph}>Tell us a little about yourself</ListItem>
                            <ListItem number={2} className={styles.paragraph}>Review coverage recommendations</ListItem>
                            <ListItem number={3} className={styles.paragraph}>Purchase what you want</ListItem>
                        </div>}
                        buttons={[
                            {
                                title: 'BUY NOW',
                                iconUrl: cartImg,
                                iconClassName: styles.buyNowButtonImg,
                                onClick: ((pendingState === userSessionPendingStates.PRODUCT_SELECTION) && !hasPendingProducts) ? this.handleCancelSurveyClick : () => history.push(buyLink)}
                        ]}
                    />
                    <HomePageCard
                        className={styles.card}
                        icon={<img alt='' src={serviceImg} className={styles.cardServiceIcon}/>}
                        iconTitle='SERVICE'
                        title='Manage your insurance policy'
                        body={<div>
                            <div className={styles.paragraph}>Review your policy dashboard </div>
                            <div className={styles.paragraph}>Update your profile details like address &amp; contact details</div>
                        </div>}
                        buttons={[
                            {title: 'EDIT PROFILE', iconUrl: editImg, iconClassName: styles.editButtonImg, onClick: () => history.push('/profile/address')},
                            {title: 'DASHBOARD', iconUrl: dashboardImg, iconClassName: styles.dashboardButtonImg, onClick: () =>history.push('/profile/dashboard')}
                        ]}
                    />
                    <HomePageCard
                        className={styles.card}
                        icon={<img alt='' src={claimImg} className={styles.cardClaimIcon}/>}
                        iconTitle='CLAIM'
                        title='Manage your insurance claims'
                        body={<div>
                            <div className={styles.paragraph}>Report a claim and get speedy payment. </div>
                            <div className={styles.paragraph}>Review progress of your claim</div>
                        </div>}
                        buttons={[
                            {title: 'REPORT A CLAIM', iconUrl: alertImg, iconClassName: styles.reportButtonImg, onClick: () => history.push('/report-claim')},
                            {title: 'REVIEW CLAIM', iconUrl: reviewImg, iconClassName: styles.reviewButtonImg, onClick: () => history.push('/claims')}
                        ]}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        userName: state.auth.user.given_name,
        pendingState: state.auth.userSession.pendingState,
        /*            showCompleteSurveyMessage: state.auth.userSession.pendingState === userSessionPendingStates.SURVEY,
         showQuotesAvailableMessage: state.auth.userSession.pendingState === userSessionPendingStates.PRODUCT_SELECTION && hasPendingProducts,*/
        hasPendingProducts: state.quotes.hasPendingProducts
    }),
    (dispatch) => ({
        cancelSurvey: (payload) => dispatch(cancelSurveyRequest(payload))
    })
)(HomePage)
