import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '../../../../../../base-components/Button/Button';
import FormItem from '../FormItem/FormItem';
import FormInput from '../../../../../../features/demographicForm/components/FormInput/FormInput';
import FormSelect from '../../../../../../base-components/Select/Select';

import styles from './ProfileForm.module.scss';

const businessTypeOptions = [
    {value: 'florist-shop', label: 'Florist Shop'},
    {value: 'another-type', label: 'Another type of business'}
];

const businessLocationOptions = [
    {value: 'location-1', label: 'Location 1'},
    {value: 'location-2', label: 'Location 2'}
];


class ProfileForm extends React.Component {
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
                <FormItem
                    title='Your business is a'
                    description='Choose the phrase that best describes your business. If nothing applies, choose “Another type of business.”'
                    input={<Field
                        name='business_type'
                        className={styles.businessTypeSelect}
                        options={businessTypeOptions}
                        component={FormSelect}/>
                    }/>

                <FormItem
                    title='Your zip code is'
                    description='Enter the zip code where you conduct the majority of your business.'
                    input={<Field
                        name='zip_code'
                        className={styles.zipCodeInput}
                        component={FormInput}/>
                    }/>

                <FormItem
                    title='Your business location is in a'
                    description='Select the place where you conduct most of your business.'
                    input={<Field
                        name='business_location'
                        className={styles.businessLocationSelect}
                        options={businessLocationOptions}
                        component={FormSelect}/>
                    }/>

                <FormItem
                    title='Number of employees'
                    description='Include all persons on the payroll, including owners, partners and those who work from home.'
                    input={<Field
                        name='employees_number'
                        className={styles.employeesNumberInput}
                        component={FormInput}/>
                    }/>

                {error && <div className={styles.formError}>{error}</div>}
                <div className={styles.submitButtonContainer}>
                    <Button
                        className={styles.submitButton}
                        disabled={submitting || invalid}
                        type='submit'
                    >
                        VIEW OPTIONS
                    </Button>
                </div>
            </form>
        )
    }
}

ProfileForm =  reduxForm({
    form: 'profileForm',
    validate: values => {
        const errors = {};

        if (!values.business_type) errors.business_type = 'Required';
        if (!values.zip_code) errors.zip_code = 'Required';
        if (!values.business_location) errors.business_location = 'Required';
        if (!values.employees_number) errors.employees_number = 'Required';

        return errors;
    }
})(ProfileForm);

export default ProfileForm;