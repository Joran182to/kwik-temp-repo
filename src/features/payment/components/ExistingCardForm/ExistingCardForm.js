import React from 'react';
import Button from '../../../../base-components/Button/Button';
import { Field, reduxForm } from 'redux-form';
import ValidationWrapper from '../../../../base-components/ValidationWrapper/ValidationWrapper';
import ValidatedSelect from '../../../../base-components/ValidatedSelect/ValidatedSelect';
import addCardIcon from '../../../../assets/icons/add-card.svg';

import * as styles from './ExistingCardForm.module.scss';

class ExistingCardForm extends React.Component {

    handleFormSubmit = (values) => {
        const { onSubmit } = this.props;
        return onSubmit(values);
    };

    renderSelectOption(value, key) {
        return <div className={styles.customOption}>
            <img src={value.icon} />
            <span>{value.label}</span>
        </div>
    }

    renderSelectValue(value, key) {
        return <div className={styles.customValue}>
            <img alt='' src={value.icon} className={styles.valueCardBrandIcon}/>
            <span className={styles.valueCardNumber}>{value.label}</span>
        </div>
    }

    render() {
        const { handleSubmit, isLoading, cards, addNewCard} = this.props;
        const formattedCards = cards.map(card => {
            return {
                value: card.token,
                label: '**** **** **** ' + card.last4,
                icon: card.imageUrl
            }
        });

        return (
            <form  onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className={styles.paySecurelyMessage}>
                    Pay securely using
                </div>

                <Field
                    name='paymentMethodToken'
                    className={styles.cardSelect}
                    component={ValidationWrapper}
                    children={ValidatedSelect}
                    inputWrapperClassName={styles.selectWrapper}
                    selectClassName={styles.inputSelect}
                    options={formattedCards}
                    searchable={false}
                    optionRenderer={this.renderSelectOption}
                    valueRenderer={this.renderSelectValue}
                />
                
                <Button onClick={() => addNewCard()} className={styles.newCardBtn}><img className={styles.addCardIcon} src={addCardIcon} /><span>Add another card</span></Button>

                <div className={styles.payBtnContainer}>
                    <Button type='submit' disabled={isLoading} className={styles.payBtn}> PAY NOW </Button>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'existingCardForm'
})(ExistingCardForm)