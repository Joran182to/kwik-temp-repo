import React from 'react';
import {connect} from 'react-redux';
import {signUpRequest} from '../../actions';
import Card from '../../../../base-components/Card/Card';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import * as styles from './SignUpPage.module.scss';

class SignUpPage extends React.Component {
    handleSignUpFormSubmit = (values) => {
        const {signUp, history} = this.props;

        return new Promise((resolve, reject) => {
            signUp({values, reject, history});
        });
    };

    render() {
        return (
            <Card className={styles.container}>
                <div className={styles.title}>Sign Up</div>
                <SignUpForm onSubmit={this.handleSignUpFormSubmit}/>
            </Card>
        )
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        signUp: payload => dispatch(signUpRequest(payload))
    })
)(SignUpPage);