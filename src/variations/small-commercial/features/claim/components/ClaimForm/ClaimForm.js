import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '../../../../../../base-components/Button/Button';
import DocumentsInput from '../../../../../../base-components/DocumentsInput/DocumentsInput';
import DatePicker from '../../../../../../base-components/DatePicker/DatePicker';
import claimSearchImg from '../../../../../../assets/icons/claim-search.svg';

import styles from './ClaimForm.module.scss';

class ClaimForm extends React.Component {
    handleFormSubmit = (values) => {
        const { onSubmit } = this.props;

        return onSubmit(values);
    };

    componentDidMount() {
        if (this.props.invalid) {
            this.props.onFormInvalid();
        } else {
            this.props.onFormValid();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.invalid && !this.props.invalid) this.props.onFormValid();
        if (!prevProps.invalid && this.props.invalid) this.props.onFormInvalid();
    }

    render() {
        const { error, submitting, invalid, handleSubmit, policyName, uploadFile } = this.props;

        return (
            <form
                className={styles.form}
                onSubmit={handleSubmit(this.handleFormSubmit)}
            >
                <div className={styles.policyName}>{policyName}</div>

                <Field
                    name='message'
                    placeholder='Describe the incident in as much detail as possible '
                    component='textarea'
                    className={styles.claimDescriptionTextarea}
                />

                <Field
                    name='documents'
                    component={DocumentsInput}
                    uploadFile={uploadFile}
                />

                {error && <div className={styles.formError}>{error}</div>}
            </form>
        )
    }
}

ClaimForm =  reduxForm({
    form: 'claimForm',
    initialValues: {
        documents: []
    },
    validate: values => {
        const errors = {};

        if (!values.message) errors.message = 'Required';
        if (values.documents.length === 0) errors.documents = 'Required';

        return errors;
    }
})(ClaimForm);

export default ClaimForm;