import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkLogInState} from './features/auth/actions';
import {withRouter} from 'react-router-dom';
import Footer from './features/footer/components/Footer/Footer';
import Header from './features/header/containers/Header/Header';
import GlobalMessageContainer from './features/ui/containers/GlobalMessageContainer/GlobalMessageContainer';

import * as styles from './App.module.scss';

class App extends Component {
    componentDidMount() {
        this.props.checkLogInState();
    }

    render() {
        const {Routes, isMessageVisible, isLoggedIn, isLogInStateChecked} = this.props;
        const childProps = {isLoggedIn};

        if (!isLogInStateChecked) {
            return null;
        }

        return (
            <div className={styles.app}>
                <Header />
                {
                    isMessageVisible && <GlobalMessageContainer />
                }
                <div className={styles.mainContent}>
                    <Routes childProps={childProps}/>
                </div>
                <Footer className={styles.footer}/>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        isLoggedIn: state.auth.isLoggedIn,
        isLogInStateChecked: state.auth.isLogInStateChecked,
        isMessageVisible: state.ui.isMessageVisible
    }),
    (dispatch) => ({
        checkLogInState: () => dispatch(checkLogInState())
    })
)(App));
