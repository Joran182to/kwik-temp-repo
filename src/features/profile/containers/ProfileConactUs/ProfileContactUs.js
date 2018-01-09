import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ProfileComponent from '../../components/ProfileComponent/ProfileComponent';
import Button from '../../../../base-components/Button/Button';
import ValidationWrapper from '../../../../base-components/ValidationWrapper/ValidationWrapper';
import ValidatedSelect from '../../../../base-components/ValidatedSelect/ValidatedSelect';
import {profileTabs} from '../../constants';
import {sendContactFormRequest, getUserPlansRequest, setContactFormMessage} from '../../actions';

import styles from './ProfileContactUs.module.scss';

class ProfileContactUs extends React.Component {

    componentWillMount() {
        this.props.getUserPlans();
        this.props.setContactFormMessage('');
    }

    handleFormSubmit = (values) => {
        return new Promise((resolve, reject) => {
            this.props.sendContactForm({values, resolve});
        });
    };

    render() {
        const {plans, products, pristine, message, invalid, submitting, handleSubmit } = this.props;

        const planOptions = products ? plans.map((plan, key) => ({label: products[key].name, value: plan.id})) : null;

        return (
            <ProfileComponent
                activeTab={profileTabs.CONTACT_US}
                actionButton={
                    message
                        ? <div className={styles.formMessage}>{message}</div>
                        : <Button
                            className={styles.submitButton}
                            disabled={submitting || pristine || invalid}
                            type='submit'
                            onClick={handleSubmit(this.handleFormSubmit)}
                        >
                            SUBMIT
                        </Button>
                }
            >
                <form>
                    <div className={styles.row}>
                        <Field
                            name='policyId'
                            placeholder='Select Contract'
                            component={ValidationWrapper}
                            children={ValidatedSelect}
                            options={planOptions}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name='message'
                            placeholder='Let us know how we can help. Detail your request here and it will be submitted to help@kwikcover.com. A copy of the request will be sent to your email address.'
                            component={'textarea'}
                            className={styles.contactMessage}
                        />
                    </div>
                    <div className={styles.description}>
                        Contact us at <span className={styles.link}>help@kwikcover.com</span> to make policy changes
                    </div>
                </form>
            </ProfileComponent>
        )
    }
}

ProfileContactUs =  reduxForm({
    form: 'profileContactForm',
    enableReinitialize: true,
    validate: (values) => {
        const errors = {};

        if (!values.policyId) errors.policyId = 'Required';
        if (!values.message) errors.message = 'Required';

        return errors;
    }
})(ProfileContactUs);

ProfileContactUs = connect(
    state => ({
        plans: state.profile.plans,
        products: state.auth.userSession.purchasedProducts,
        message: state.profile.contactFormMessage
    }),
    dispatch => ({
        getUserPlans: () => dispatch(getUserPlansRequest()),
        sendContactForm: (payload) => dispatch(sendContactFormRequest(payload)),
        setContactFormMessage: (message) => dispatch(setContactFormMessage(message))
    })
)(ProfileContactUs);

export default ProfileContactUs;