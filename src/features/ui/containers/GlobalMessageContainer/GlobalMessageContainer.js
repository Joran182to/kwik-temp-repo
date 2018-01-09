import React from 'react';
import {connect} from 'react-redux';
import VerifyAccountMessage from '../VerifyAccountMessage/VerifyAccountMessage';
import AccountInsuredMessage from '../AccountInsuredMessage/AccountInsuredMessage';
import {messageTypes} from '../../constants';

const components = {
    [messageTypes.VERIFY_ACCOUNT]: VerifyAccountMessage,
    [messageTypes.ACCOUNT_INSURED]: AccountInsuredMessage
};

class GlobalMessageContainer extends React.Component {
    render() {
        const {messageType, messageProps} = this.props;

        const SpecificMessage = components[messageType];

        return <SpecificMessage {...messageProps}/>
    }
}

export default connect(
    (state) => ({
        messageType: state.ui.messageType,
        messageProps: state.ui.messageProps
    })
)(GlobalMessageContainer)