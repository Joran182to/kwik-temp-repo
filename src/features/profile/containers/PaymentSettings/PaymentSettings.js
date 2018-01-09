import React from 'react';
import {connect} from 'react-redux';
import ProfileComponent from '../../components/ProfileComponent/ProfileComponent';
import CardSelect from '../../../payment/components/CardSelect/CardSelect';
import PaymentForm from '../../../payment/components/PaymentForm/PaymentForm';
import {profileTabs} from '../../constants';
import {getSavedCards, createCard, deleteCard} from '../../../payment/actions';
import Button from '../../../../base-components/Button/Button';
import addCardIcon from '../../../../assets/icons/add-card.svg';
import styles from './PaymentSettings.module.scss';

class PaymentSettings extends React.Component {

    state = {
        showNewCardForm: false,
        newCardSubmitting: false,
        selectedCardToken: null
    };

    componentWillMount() {
        this.props.getSavedCards();
    }

    componentWillReceiveProps(nextProps) {
        if ((!nextProps.isFetchingSavedCards && (nextProps.savedCards.length > 0)) && (this.props.isFetchingSavedCards)) {
            this.setState({selectedCardToken: nextProps.savedCards[0].token});
        }
    }

    selectCard = (card) => {
        if (card.paymentMethodToken) {
            this.setState({selectedCardToken: card.paymentMethodToken});
        }

    };
    
    renderCardList = () => {
        const {savedCards} = this.props;
        return <CardSelect
            cards={savedCards}
            onChange={this.selectCard}
            initialValues={(savedCards.length > 0) ? {paymentMethodToken: savedCards[0].token} : {}}
        />
    };

    handleNewCardClick = () => {
        this.setState({showNewCardForm: true});
    };

    handlePaymentFormSubmit = values => {
        this.setState({newCardSubmitting: true});
        return new Promise((resolve, reject) => {
            this.props.createCard({values, resolve});
        }).then(() => {
            this.setState({showNewCardForm: false, newCardSubmitting: false});
        });

    };

    renderCardInfo = () => {
        const {savedCards, deleteCard} = this.props;
        return <div>
            <div>
                <PaymentForm data={savedCards[0]} viewOnly={true} saveOption={false}/>
            </div>
            {/*<span onClick={() => deleteCard(savedCards[0])}> Remove this card </span>*/}
        </div>;
    };

    render() {
        const {savedCards, isFetchingSavedCards} = this.props;

        return (
            <ProfileComponent activeTab={profileTabs.PAYMENT_METHOD} className={styles.container}>
                {savedCards.length && !this.state.showNewCardForm ? this.renderCardList() : null}
                {this.state.showNewCardForm
                    ? <PaymentForm onSubmit={this.handlePaymentFormSubmit} isLoading={this.state.newCardSubmitting} saveOption={false} buttonLabel={'Save'} />
                    : <Button onClick={this.handleNewCardClick} className={styles.newCardBtn}><img className={styles.addCardIcon} src={addCardIcon} /><span>Add another card</span></Button>}
                {this.state.selectedCardToken ? this.renderCardInfo() : null}
            </ProfileComponent>
        )
    }
}

PaymentSettings = connect(
    state => ({
        savedCards: state.payment.savedCards,
        isFetchingSavedCards: state.payment.isFetchingSavedCards
    }),
    dispatch => ({
        getSavedCards: () => dispatch(getSavedCards()),
        createCard: payload => dispatch(createCard(payload)),
        deleteCard: payload => dispatch(deleteCard(payload))
    })
)(PaymentSettings);

export default PaymentSettings;