import React from 'react';
import {connect} from 'react-redux';
import {submit} from 'redux-form';
import styles from './ReportClaimPage.module.scss';
import {uploadFile} from '../../../../../../features/claim/actions';
import Message from '../../../../../../base-components/Message/Message';
import Button from '../../../../../../base-components/Button/Button';
import Card from '../../../../../../base-components/Card/Card';
import PolicySearchForm from '../../components/PolicySearchForm/PolicySearchForm';
import ClaimForm from '../../components/ClaimForm/ClaimForm';

const reportClaimStates = {
    POLICY_NOT_SEARCHED: 'POLICY_NOT_SEARCHED',
    POLICY_NOT_FOUND: 'POLICY_NOT_FOUND',
    POLICY_FOUND: 'POLICY_FOUND',
    CLAIM_SENT: 'CLAIM_SENT'
};

/*
* TODO
* https://opportunity.atlassian.net/browse/KWIK-30
* - call policy search endpoint
* - isPolicySearched, isPolicyFound, isClaimSent should be at redux state
* - claim info also should be taken from redux state
* - call claim create endpoint
* */

class ReportClaimPage extends React.Component {
    constructor() {
        super();

        this.state = {
            isPolicySearched: false,
            isPolicyFound: null,
            isClaimSent: false,
            isClaimFormValid: false
        };
    }

    handlePolicySearchFormSubmit = (values) => {
        console.log(values);

        this.setState({
            isPolicySearched: true,
            isPolicyFound: true
        })
    };

    handleClaimFormSubmit = (values) => {
        console.log(values);

        this.setState({
            isClaimSent: true
        })
    };

    getReportClaimState = () => {
        const {isPolicySearched, isPolicyFound, isClaimSent} = this.state;

        if (!isPolicySearched) return reportClaimStates.POLICY_NOT_SEARCHED;
        if (isClaimSent) return reportClaimStates.CLAIM_SENT;
        if (isPolicySearched && isPolicyFound) return reportClaimStates.POLICY_FOUND;
        if (isPolicySearched && !isPolicyFound) return reportClaimStates.POLICY_NOT_FOUND;
        if (isPolicySearched && !isPolicyFound) return reportClaimStates.POLICY_NOT_FOUND;
    };

    handleClaimFormValid = () => {
        this.setState({isClaimFormValid: true});
    };

    handleClaimFormInvalid = () => {
        this.setState({isClaimFormValid: false});
    };

    render() {
        const {uploadFile, submitClaimForm} = this.props;
        let content;

        const reportClaimState = this.getReportClaimState();
        switch (reportClaimState) {
            case reportClaimStates.POLICY_NOT_SEARCHED:
                content = null;
                break;

            case reportClaimStates.POLICY_NOT_FOUND:
                content = <div className={styles.policyNotFoundText}>
                    Policy not found
                </div>;
                break;

            case reportClaimStates.POLICY_FOUND:
                content = <ClaimForm
                    onSubmit={this.handleClaimFormSubmit}
                    uploadFile={uploadFile}
                    onFormValid={this.handleClaimFormValid}
                    onFormInvalid={this.handleClaimFormInvalid}
                    policyName='Business Owner effective 11/1/2016'/>;
                    break;

            case reportClaimStates.CLAIM_SENT:
                content = <div className={styles.claimSentText}>
                    Thank you. Your claim has been filed and you will hear from our servicing team very soon.
                </div>;
                break;
        }

        return (
            <div>
                <Message
                    title='Claim'
                    description='File your claims here. Attach all relevant documents along with your claim.'/>
                <Card className={styles.container}>
                    <PolicySearchForm onSubmit={this.handlePolicySearchFormSubmit}/>
                    <div className={styles.contentContainer}>
                        {content}
                    </div>
                </Card>
                {
                    (reportClaimState === reportClaimStates.POLICY_FOUND)
                        && <div className={styles.submitButtonContainer}>
                            <Button
                                onClick={submitClaimForm}
                                disabled={!this.state.isClaimFormValid}
                            >
                                Claim
                            </Button>
                        </div>
                }
            </div>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => ({
        uploadFile: file => dispatch(uploadFile(file)),
        submitClaimForm: () => dispatch(submit('claimForm'))
    })
)(ReportClaimPage);