import React from 'react';
import {connect} from 'react-redux';

import styles from './NotFoundPage.module.scss';

class NotFoundPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>404</div>
        )
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(NotFoundPage)