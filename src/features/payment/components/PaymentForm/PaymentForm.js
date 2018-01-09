import React from 'react';
import Button from '../../../../base-components/Button/Button';
import { Field, reduxForm } from 'redux-form';
import ValidationWrapper from '../../../../base-components/ValidationWrapper/ValidationWrapper';
import ValidatedInput from '../../../../base-components/ValidatedInput/ValidatedInput';
import CardValid from 'card-validator';
import Payment from 'payment';
import cardIcon from '../../../../assets/icons/credit-card-icon.svg';
import SurveyCheckbox from '../../../survey/components/SurveyCheckbox/SurveyCheckbox';

import * as styles from './PaymentForm.module.scss';

class PaymentForm extends React.Component {

    handleFormSubmit = (values) => {
        const { onSubmit } = this.props;
        return onSubmit(values);
    };

    componentDidMount() {
        Payment.formatCardNumber(this.cardNumber);
        Payment.formatCardExpiry(this.cardExpiry);
        Payment.formatCardCVC(this.cardCVC);
    }

    render() {
        const { handleSubmit, isLoading, buttonLabel, saveOption, viewOnly, data } = this.props;
        return (
            <form className={styles.form} onSubmit={handleSubmit(this.handleFormSubmit)}>
                <Field
                    name='card_number'
                    placeholder='Card Number'
                    value={viewOnly && data.card_number}
                    className={styles.paymentField}
                    component={ValidationWrapper}
                    children={ValidatedInput}
                    autoFocus={true}
                    refName={(ref) => this.cardNumber = ref}
                />
                <Field
                    name='expiry_month'
                    placeholder='Expiry (MM/YY)'
                    className={styles.paymentField}
                    value={viewOnly && data.expiry_month}
                    component={ValidationWrapper}
                    children={ValidatedInput}
                    refName={(ref) => this.cardExpiry = ref}
                />
                <Field
                    name='cvv'
                    placeholder='CVV'
                    className={styles.paymentField}
                    value={viewOnly && '***'}
                    component={ValidationWrapper}
                    children={ValidatedInput}
                    additionalButton={<span
                        className={styles.passwordVisibilityIconContainer}>
                        <img alt='' className={styles.cardIcon} src={cardIcon}/>
                    </span>}
                    refName={(ref) => this.cardCVC = ref}
                 />

                {saveOption ? <Field
                    name='shouldSavePaymentMethod'
                    className={styles.checkboxContainer}
                    component={SurveyCheckbox}
                    choices={[{title: 'Save this card for later', id: {value: true}}]}
                    checkboxClassName={styles.checkbox}
                /> : null}

                {!viewOnly ? <Button type='submit' disabled={isLoading} className={styles.payBtn}> {buttonLabel} </Button> : null}
            </form>
        )
    }
}

PaymentForm.defaultProps = {
    saveOption: true,
    viewOnly: false,
    buttonLabel: 'PAY NOW'
};

export default reduxForm({
    form: 'paymentForm',
    validate: values => {
        const errors = {};
        if (!CardValid.number(values.card_number).isValid) {
            errors.card_number = 'Card number is not valid'
        }

        if (!values.card_number) {
            errors.card_number = 'Required'
        }

        if (!CardValid.expirationDate(values.expiry_month).isValid) {
            errors.expiry_month = 'Expiration date is not valid'
        }

        if (!values.expiry_month) {
            errors.expiry_month = 'Required'
        }

        if (!values.cvv || values.cvv.length > 4 || values.cvv.length < 3) {
            errors.cvv = 'CVV is not valid'
        }

        if (!values.cvv) {
            errors.cvv = 'Required'
        }

        return errors;
    }
})(PaymentForm)