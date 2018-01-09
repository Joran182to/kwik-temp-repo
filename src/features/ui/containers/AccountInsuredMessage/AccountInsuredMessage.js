import React from 'react';
import {connect} from 'react-redux';
import {hideMessage} from '../../actions';
import Message from '../../../../base-components/Message/Message';

import styles from '../VerifyAccountMessage/VerifyAccountMessage.module.scss';

class AccountInsuredMessage extends React.Component {
    render() {
        const {userEmail, givenName, hideMessage} = this.props;

        return (
            <Message
                title={`Congrats ${givenName},`}
                description={<div>You are now insured. Copies of your contracts have been mailed to <span className={styles.email}>{userEmail}.</span></div>}
                onCloseClick={hideMessage}
            />
        )
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        hideMessage: () => dispatch(hideMessage())
    })
)(AccountInsuredMessage);