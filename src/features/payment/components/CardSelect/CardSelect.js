import React from 'react';
import { Field, reduxForm } from 'redux-form';
import ValidationWrapper from '../../../../base-components/ValidationWrapper/ValidationWrapper';
import ValidatedSelect from '../../../../base-components/ValidatedSelect/ValidatedSelect';

import * as styles from './CardSelect.module.scss';

class CardSelect extends React.Component {

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
        const {cards} = this.props;
        const formattedCards = cards.map(card => {
            return {
                value: card.token,
                label: '**** **** **** ' + card.last4,
                icon: card.imageUrl
            }
        });

        return (
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
                onChange={this.props.onChange}
            />
        )
    }
}

export default reduxForm({
    form: 'existingCardForm'
})(CardSelect)