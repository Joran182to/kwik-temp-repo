import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import ProfileComponent from '../../components/ProfileComponent/ProfileComponent';
import Button from '../../../../base-components/Button/Button';
import ValidationWrapper from '../../../../base-components/ValidationWrapper/ValidationWrapper';
import ValidatedInput from '../../../../base-components/ValidatedInput/ValidatedInput';
import ValidatedSelect from '../../../../base-components/ValidatedSelect/ValidatedSelect';
import {profileTabs} from '../../constants';
import {getUserInfoRequest, updateUserProfileRequest} from '../../actions';
import { isValidEmail } from '../../../../helpers/isValidEmail';

import styles from './ProfilePhone.module.scss';

class ProfilePhone extends React.Component {
    componentWillMount() {
        this.props.getUserInfo();
    }

    handleFormSubmit = (allValues) => {
        const {phones} = this.props;
        return new Promise((resolve, reject) => {
            const values = {};
            if (allValues.email) values.email = allValues.email;
            if (allValues.phoneType) {
                values.phones = phones.map(phone => {
                    if (phone.phoneType === allValues.phoneType) {
                        return {
                            phoneType: allValues.phoneType,
                            phoneNumber: allValues.phoneNumber,
                            countryCode: allValues.countryCode
                        }
                    } else {
                        return phone
                    }
                })
            }
            this.props.updateUserProfile({values, resolve});
        });
    };

    render() {
        const { phones, pristine, error, submitting, change, handleSubmit } = this.props;
        const phoneOptions = phones ? phones.map(phone => ({label: phone.phoneType, value: phone.phoneType})) : [];

        return (
            <ProfileComponent
                activeTab={profileTabs.PHONE}
                actionButton={
                    <Button
                        className={styles.submitButton}
                        disabled={submitting || pristine}
                        type='submit'
                        onClick={handleSubmit(this.handleFormSubmit)}
                    >
                        UPDATE
                    </Button>
                }
            >
                <form>
                    <div className={styles.row}>
                        <Field
                            name='phoneType'
                            placeholder='Pick the phone number'
                            component={ValidationWrapper}
                            children={ValidatedSelect}
                            className={styles.phoneType}
                            options={phoneOptions}
                            onChange={(e, value, prevValue) => {
                                if (value !== prevValue) {
                                    const phone = phones.find(({phoneType}) => phoneType === value);
                                    change('phoneNumber', phone['phoneNumber'] || '');
                                    change('countryCode', phone['countryCode'] || '');
                                }
                            }}
                        />
                    </div>
                    <div className={cn(styles.row, styles.counryCodeAndNumber)}>
                        <Field
                            name='countryCode'
                            placeholder='Country Code'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.countryCode}
                        />
                        <Field
                            name='phoneNumber'
                            placeholder='Phone Number'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.phoneNumber}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name='email'
                            placeholder='Email'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.email}
                        />
                    </div>
                </form>
            </ProfileComponent>
        )
    }
}

ProfilePhone =  reduxForm({
    form: 'profilePhoneForm',
    enableReinitialize: true,
    validate: values => {
        const errors = {};
        if (!isValidEmail(values.email)) {
            errors.email = 'That doesn\'t look like a valid email'
        }
        return errors;
    }
})(ProfilePhone);

ProfilePhone = connect(
    state => {
        const data = state.profile.userInfo.data;
        const phones = data && data.phones;
        const existingPhone = phones && (phones.find(({phoneNumber}) => Boolean(phoneNumber)) || phones[0]);

        return {
            phones,
            initialValues: {
                email: state.profile.userInfo.email,
                phoneType: existingPhone && existingPhone.phoneType,
                phoneNumber: existingPhone && existingPhone.phoneNumber,
                countryCode: existingPhone && existingPhone.countryCode,
            }
        }
    },
    dispatch => ({
        getUserInfo: () => dispatch(getUserInfoRequest()),
        updateUserProfile: (payload) => dispatch(updateUserProfileRequest(payload))
    })
)(ProfilePhone);

export default ProfilePhone;