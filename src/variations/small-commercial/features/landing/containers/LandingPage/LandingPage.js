import React from 'react';
import {connect} from 'react-redux';

import * as styles from './LandingPage.module.scss';

class LandingPage extends React.Component {

    render() {
        return (
            <div className={styles.container}>
                Landing page
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(LandingPage);