import React from 'react';
import {connect} from 'react-redux';
import {sendDemographicFormRequest} from '../../actions';
import DemographicFormPageMessage from '../../components/DemographicFormPageMessage/DemographicFormPageMessage';
import DemographicForm from '../../components/DemographicForm/DemographicForm';

import styles from './DemographicFormPage.module.scss';

class DemographicFormPage extends React.Component {
    componentWillMount() {
        const {hasDemoInfo, history} = this.props;

        if (hasDemoInfo) {
            history.push('/survey');
        }
    }

    handleDemographicFormSubmit = (values) => {
        const {sendDemographicForm, history, email} = this.props;

        return new Promise((resolve, reject) => {
            sendDemographicForm({values, email, reject, history});
        });
    };

    render() {
        const {userName} = this.props;

        return (
            <div className={styles.container}>
                <DemographicFormPageMessage userName={userName} />
                <DemographicForm onSubmit={this.handleDemographicFormSubmit}/>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        userName: state.auth.user.given_name,
        email: state.auth.user.email,
        hasDemoInfo: state.auth.userSession.hasDemoInfo
    }),
    (dispatch) => ({
        sendDemographicForm: (values) => dispatch(sendDemographicFormRequest(values))
    })
)(DemographicFormPage)