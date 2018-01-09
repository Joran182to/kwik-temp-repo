import React from 'react';
import {connect} from 'react-redux';
import {signInRequest} from '../../actions';
import Card from '../../../../base-components/Card/Card';
import SignInForm from '../../components/SignInForm/SignInForm';

import * as styles from './SignInPage.module.scss';

class SignInPage extends React.Component {
    handleSignInFormSubmit = (values) => {
        const {signIn, history} = this.props;

        return new Promise((resolve, reject) => {
            signIn({values, reject, history});
        });
    };

    render() {
        return (
            <Card className={styles.container}>
                <div className={styles.title}>Sign In</div>
                <SignInForm onSubmit={this.handleSignInFormSubmit}/>
            </Card>
        )
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        signIn: payload => dispatch(signInRequest(payload))
    })
)(SignInPage);