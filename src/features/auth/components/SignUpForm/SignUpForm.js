import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import Button from '../../../../base-components/Button/Button';
import ValidationWrapper from '../../../../base-components/ValidationWrapper/ValidationWrapper';
import ValidatedInput from '../../../../base-components/ValidatedInput/ValidatedInput';
import ValidatedSelect from '../../../../base-components/ValidatedSelect/ValidatedSelect';
import FormSwitcher from '../../components/FormSwitcher/FormSwitcher';
import { isValidEmail } from '../../../../helpers/isValidEmail';
import eyeImg from '../../../../assets/icons/eye.svg';

import * as styles from './SignUpForm.module.scss';

const groupsMock = [
    {value: 1, label: 'First group'},
    {value: 2, label: 'Second group'},
    {value: 3, label: 'Third group'}
];

class SignUpForm extends React.Component {
    constructor() {
        super();

        this.state = {
            isPasswordVisible: false
        }
    }

    handleFormSubmit = (values) => {
        const { onSubmit } = this.props;
        return onSubmit(values);
    };

    togglePasswordVisibility = () => {
        this.setState({isPasswordVisible: !this.state.isPasswordVisible});
    };

    render() {
        const { error, submitting, handleSubmit } = this.props;

        return (
            <form
                className={styles.form}
                onSubmit={handleSubmit(this.handleFormSubmit)}
            >
                <Field
                    name='first_name'
                    placeholder='First Name'
                    className={cn(styles.halfWidthField, styles.firstNameField)}
                    component={ValidationWrapper}
                    children={ValidatedInput}
                />
                <Field
                    name='last_name'
                    placeholder='Last Name'
                    className={cn(styles.halfWidthField, styles.lastNameField)}
                    component={ValidationWrapper}
                    children={ValidatedInput}
                />
                <Field
                    name='email'
                    placeholder='Email'
                    className={styles.fullWidthField}
                    component={ValidationWrapper}
                    children={ValidatedInput}
                />
                <FormSwitcher className={styles.formSwitcher} isSignUpForm={true}/>
                <Field
                    name='password'
                    type={this.state.isPasswordVisible ? 'text' : 'password'}
                    placeholder='Password'
                    className={cn(styles.fullWidthField, styles.passwordField)}
                    component={ValidationWrapper}
                    children={ValidatedInput}
                    inputClassName={styles.passwordInput}
                    additionalButton={<Button
                        type='button'
                        onClick={this.togglePasswordVisibility}
                        className={styles.passwordVisibilityIconContainer}>
                        <img alt='' className={styles.passwordVisibilityIcon} src={eyeImg}/>
                    </Button>}
                />
                <Field
                    name='group'
                    placeholder='Group'
                    className={cn(styles.fullWidthField, styles.groupField)}
                    component={ValidationWrapper}
                    children={ValidatedSelect}
                    options={groupsMock}
                />
                {error && <div className={styles.formError}>{error}</div>}
                <Button
                    className={styles.submitButton}
                    disabled={submitting}
                    type='submit'
                >
                    Sign Up
                </Button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'signUpForm',
    validate: values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required'
        } else if (!isValidEmail(values.email)) {
            errors.email = 'That doesn\'t look like a valid email'
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 8) {
            errors.password = `Minimal password length is 8 symbols`;
        }

        if (!values.first_name) {
            errors.first_name = 'Required';
        }

        if (!values.last_name) {
            errors.last_name = 'Required';
        }

        return errors;
    }
})(SignUpForm)
