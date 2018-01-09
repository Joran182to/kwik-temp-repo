import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import ProfileComponent from '../../components/ProfileComponent/ProfileComponent';
import Button from '../../../../base-components/Button/Button';
import ValidationWrapper from '../../../../base-components/ValidationWrapper/ValidationWrapper';
import ValidatedInput from '../../../../base-components/ValidatedInput/ValidatedInput';
import ValidatedSelect from '../../../../base-components/ValidatedSelect/ValidatedSelect';
import {profileTabs, countries} from '../../constants';
import {getUserInfoRequest, updateUserProfileRequest} from '../../actions';

import styles from './ProfileAddress.module.scss';

class ProfileAddress extends React.Component {
    componentWillMount() {
        this.props.getUserInfo();
    }

    handleFormSubmit = (values) => {
        return new Promise((resolve, reject) => {
            this.props.updateUserProfile({values, resolve});
        });
    };

    render() {
        const { pristine, error, submitting, handleSubmit } = this.props;

        return (
            <ProfileComponent
                activeTab={profileTabs.ADDRESS}
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
                    <div className={cn(styles.row, styles.names)}>
                        <Field
                            name='given_name'
                            placeholder='First Name'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.firstName}
                        />
                        <Field
                            name='middle_name'
                            placeholder='Middle Name'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.middleName}
                        />
                        <Field
                            name='family_name'
                            placeholder='Last Name'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.lastName}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name='country'
                            placeholder='Country'
                            component={ValidationWrapper}
                            children={ValidatedSelect}
                            className={styles.countries}
                            options={countries}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name='mailingAddress'
                            placeholder='Address'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.address}
                        />
                    </div>
                    <div className={styles.row}>
                        <Field
                            name='zipCode'
                            placeholder='Zip Code'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.zipCode}
                        />
                    </div>
                    <div className={cn(styles.row, styles.cityAndState)}>
                        <Field
                            name='city'
                            placeholder='City'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.city}
                        />
                        <Field
                            name='state'
                            placeholder='State'
                            component={ValidationWrapper}
                            children={ValidatedInput}
                            className={styles.state}
                        />
                    </div>
                </form>
            </ProfileComponent>
        )
    }
}

ProfileAddress =  reduxForm({
    form: 'profileAddressForm',
    enableReinitialize: true
})(ProfileAddress);

ProfileAddress = connect(
    state => ({
        initialValues: state.profile.userInfo.data
    }),
    dispatch => ({
        getUserInfo: () => dispatch(getUserInfoRequest()),
        updateUserProfile: (payload) => dispatch(updateUserProfileRequest(payload))
    })
)(ProfileAddress);

export default ProfileAddress;