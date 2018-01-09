import React from 'react';
import {connect} from 'react-redux';
import {saveProfileRequest} from '../../actions';
import styles from './ProfilePage.module.scss';
import Message from '../../../../../../base-components/Message/Message';
import ProfileForm from '../../components/ProfileForm/ProfileForm';

class ProfilePage extends React.Component {
    render() {
        const {saveProfileRequest} = this.props;

        return (
            <div className={styles.container}>
                <Message
                    title='Profile'
                    description='Some quick and easy questions to get you a certificate of insurance right away'/>
                <ProfileForm onSubmit={saveProfileRequest} />
            </div>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        saveProfileRequest: (values) => dispatch(saveProfileRequest(values))
    })
)(ProfilePage);