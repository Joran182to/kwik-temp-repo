import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '../../../../../../base-components/Button/Button';
import DatePicker from '../../../../../../base-components/DatePicker/DatePicker';
import claimSearchImg from '../../../../../../assets/icons/claim-search.svg';

import styles from './PolicySearchForm.module.scss';

class PolicySearchForm extends React.Component {
    constructor() {
        super();

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = (values) => {
        const { onSubmit } = this.props;

        return onSubmit(values);
    };

    render() {
        const { error, submitting, invalid, handleSubmit } = this.props;

        return (
            <form
                className={styles.form}
                onSubmit={handleSubmit(this.handleFormSubmit)}
            >
                <Field
                    name='policy_number'
                    placeholder='Enter Policy Number'
                    component='input'
                    className={styles.policyNumberInput}
                />

                <Field
                    name='policy_effective_date'
                    placeholder='Policy effective date'
                    component={DatePicker}
                />

                {error && <div className={styles.formError}>{error}</div>}
                <Button
                    className={styles.submitButton}
                    disabled={submitting || invalid}
                    type='submit'
                >
                    <img src={claimSearchImg} className={styles.claimSearchImg} />
                </Button>
            </form>
        )
    }
}

PolicySearchForm =  reduxForm({
    form: 'policySearcForm',
    validate: values => {
        const errors = {};

        if (!values.policy_number) errors.policy_number = 'Required';
        if (!values.policy_effective_date) errors.policy_effective_date = 'Required';

        return errors;
    }
})(PolicySearchForm);

export default PolicySearchForm;