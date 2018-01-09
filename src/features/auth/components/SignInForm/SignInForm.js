import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import Button from '../../../../base-components/Button/Button';
import ValidationWrapper from '../../../../base-components/ValidationWrapper/ValidationWrapper';
import ValidatedInput from '../../../../base-components/ValidatedInput/ValidatedInput';
import FormSwitcher from '../../components/FormSwitcher/FormSwitcher';
import { isValidEmail } from '../../../../helpers/isValidEmail';
import eyeImg from '../../../../assets/icons/eye.svg';

import * as styles from './SignInForm.module.scss';

class SignInForm extends React.Component {
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
        const { error, submitting, invalid, handleSubmit } = this.props;

        return (
            <form
                className={styles.form}
                onSubmit={handleSubmit(this.handleFormSubmit)}
            >
                <Field
                    name='email'
                    placeholder='Email'
                    className={styles.fullWidthField}
                    component={ValidationWrapper}
                    children={ValidatedInput}
                />
                <FormSwitcher className={styles.formSwitcher} isSignInForm={true}/>
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
                {error && <div className={styles.formError}>{error}</div>}
                <Button
                    className={styles.submitButton}
                    disabled={submitting || invalid}
                    type='submit'
                >
                    Sign In
                </Button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'signInForm',
    validate: values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required'
        } else if (!isValidEmail(values.email)) {
            errors.email = 'That doesn\'t look like a valid email'
        }

        if (!values.password) {
            errors.password = 'Required'
        }

        return errors;
    }
})(SignInForm)