import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import * as constants from '../../constants';
import Button from '../../../../base-components/Button/Button';
import FormLine from '../../components/FormLine/FormLine';
import FormInput from '../../components/FormInput/FormInput';
import FormSelect from '../../../../base-components/Select/Select';

import styles from './DemographicForm.module.scss';

const martialOptions = [
    {value: constants.martialStatuses.SINGLE, label: 'Single'},
    {value: constants.martialStatuses.MARRIED, label: 'Married'}
];

const employmentOptions = [
    {value: constants.employmentStatuses.EMPLOYED, label: 'Employed'},
    {value: constants.employmentStatuses.UNEMPLOYED, label: 'Unemployed'}
];

const smokerOptions = [
    {value: constants.smokerStatuses.SMOKER, label: 'Smoker'},
    {value: constants.smokerStatuses.NON_SMOKER, label: 'Non-smoker'}
];

class DemographicForm extends React.Component {
    handleFormSubmit = (values) => {
        const { onSubmit } = this.props;

        const {smokerStatus, smokerDuration, ...otherValues} = values;
        if (smokerStatus === constants.smokerStatuses.SMOKER) {
            otherValues.isSmoker = true;
            otherValues.smokerDuration = smokerDuration;
        } else {
            otherValues.isSmoker = false;
        }

        return onSubmit(otherValues);
    };

    render() {
        const { error, submitting, invalid, handleSubmit, isSmoker } = this.props;

        return (
            <form
                className={styles.form}
                onSubmit={handleSubmit(this.handleFormSubmit)}
            >
                <FormLine>
                    I am
                    <Field
                        name='age'
                        type='number'
                        className={styles.ageInput}
                        component={FormInput}
                        min='1'
                    />
                    years old
                </FormLine>

                <FormLine>
                    My zip code is
                    <Field
                        name='zipCode'
                        className={styles.zipCodeInput}
                        component={FormInput}
                    />
                </FormLine>

                <FormLine>
                    My current address is
                    <Field
                        name='mailingAddress'
                        className={styles.addressInput}
                        component={FormInput}
                    />
                </FormLine>

                <FormLine>
                    My city is
                    <Field
                        name='city'
                        className={styles.addressInput}
                        component={FormInput}
                    />
                </FormLine>
                <FormLine>
                    My state is
                    <Field
                        name='state'
                        className={styles.zipCodeInput}
                        component={FormInput}
                    />
                </FormLine>

                <FormLine>
                    I am currently
                    <Field
                        name='maritalStatus'
                        className={styles.martialStatusSelect}
                        component={FormSelect}
                        options={martialOptions}
                    />
                    and
                    <Field
                        name='employmentStatus'
                        className={styles.employmentStatusSelect}
                        component={FormSelect}
                        options={employmentOptions}
                    />
                </FormLine>

                <FormLine>
                    I am a
                    <Field
                        name='smokerStatus'
                        className={styles.smokerStatusSelect}
                        component={FormSelect}
                        options={smokerOptions}
                    />
                </FormLine>

                {
                    isSmoker
                        && <FormLine>
                            I have smoked for
                            <Field
                                name='smokerDuration'
                                className={styles.smokerDurationInput}
                                type='number'
                                min='1'
                                component={FormInput}
                            /> years
                        </FormLine>
                }

                {error && <div className={styles.formError}>{error}</div>}
                <Button
                    className={styles.submitButton}
                    disabled={submitting || invalid}
                    type='submit'
                >
                    NEXT
                </Button>
            </form>
        )
    }
}

DemographicForm =  reduxForm({
    form: 'demographicForm',
    validate: values => {
        const errors = {};

        if (!values.age) errors.age = 'Required';
        if (!values.zipCode) errors.zipCode = 'Required';
        if (!values.mailingAddress) errors.mailingAddress = 'Required';
        if (!values.maritalStatus) errors.maritalStatus = 'Required';
        if (!values.employmentStatus) errors.employmentStatus = 'Required';
        if (!values.smokerStatus) errors.age = 'Required';
        if ((values.smokerStatus === constants.smokerStatuses.SMOKER) && !values.smokerDuration) errors.smokerDuration = 'Required';

        return errors;
    }
})(DemographicForm);

const selector = formValueSelector('demographicForm');

DemographicForm = connect(state => {
    const smokerStatus = selector(state, 'smokerStatus');
    return {
        isSmoker: smokerStatus === constants.smokerStatuses.SMOKER
    };
})(DemographicForm);

export default DemographicForm;