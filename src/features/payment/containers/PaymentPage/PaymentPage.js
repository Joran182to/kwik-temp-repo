import React from 'react';
import {connect} from 'react-redux';
import {submitPayment, getSavedCards} from '../../actions';
import {getCartRequest} from '../../../quotes/actions';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import ExistingCardForm from '../../components/ExistingCardForm/ExistingCardForm';

import styles from './PaymentPage.module.scss';
import cardsIcon from '../../../../assets/icons/cards.svg';

class PaymentPage extends React.Component {
    
    constructor() {
        super();
        
        this.state = {
            showNewCardForm: false    
        }
    }

    componentDidMount() {
        this.props.getCart();
        this.props.getSavedCards();
    }

    handleNewCardClick = () => {
        this.setState({showNewCardForm: true});
    };

    handlePaymentFormSubmit = values => {
        this.props.submitPayment(values, this.props.history);
    };

    render() {
        const {products, savedCards} = this.props;
        return (
            <div className={styles.container}>
                <h2>Payment</h2>
                <div className={styles.paymentWrapper}>
                    <div className={styles.paymentForm}>
                        <header className={styles.cardHeader}>
                            <span className={styles.payPalIcon}>PayPal</span>
                            <div className={styles.secureBlock}><span className={styles.secureInfo}>Pay securely using </span><span><img src={cardsIcon} /></span></div>
                        </header>
                        {!savedCards.length || this.state.showNewCardForm
                            ? <PaymentForm onSubmit={this.handlePaymentFormSubmit} isLoading={this.props.paymentLoading} />
                            : <ExistingCardForm
                                addNewCard={this.handleNewCardClick}
                                cards={savedCards}
                                onSubmit={this.handlePaymentFormSubmit}
                                isLoading={this.props.paymentLoading}
                                initialValues={(savedCards.length > 0) ? {paymentMethodToken: savedCards[0].token} : {}} />}
                    </div>
                    <div className={styles.paymentSummary}>
                        <SummaryCard products={products} />
                    </div>
                </div>
                
            </div>
        )
    }
}

export default connect(
    (state) => ({
        products: state.quotes.cart,
        savedCards: state.payment.savedCards,
        paymentLoading: state.payment.paymentLoading
    }),
    (dispatch) => ({
        getCart: () => dispatch(getCartRequest()),
        submitPayment: (values, history) => dispatch(submitPayment(values, history)),
        getSavedCards: () => dispatch(getSavedCards())
    })
)(PaymentPage)