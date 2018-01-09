import React from 'react';
import {connect} from 'react-redux';
import {hideMessage} from '../../actions';
import Message from '../../../../base-components/Message/Message';

import styles from './VerifyAccountMessage.module.scss';

class VerifyAccountMessage extends React.Component {
    render() {
        const {userEmail, hideMessage} = this.props;

        return (
            <Message
                title="Hello,"
                description={<div>An email has sent to <span className={styles.email}>{userEmail}</span> to verify your account.</div>}
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
)(VerifyAccountMessage);