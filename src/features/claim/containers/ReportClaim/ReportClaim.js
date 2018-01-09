import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {getUserPlansRequest, } from '../../../profile/actions';
import {uploadFile, createClaim} from '../../actions';
import Card from '../../../../base-components/Card/Card';
import ImageBtn from '../../../../assets/icons/upload-photo.svg';
import FileBtn from '../../../../assets/icons/upload.svg';
import Button from '../../../../base-components/Button/Button';
import ValidationWrapper from '../../../../base-components/ValidationWrapper/ValidationWrapper';
import ValidatedSelect from '../../../../base-components/ValidatedSelect/ValidatedSelect';

import styles from '../../containers/ReportClaim/ReportClaim.module.scss';

class ReportClaim extends React.Component {

    state = {
        images: [],
        previews: [],
        filePreviews: [],
        files: []
    };

    componentWillMount() {
        this.props.getUserPlans();
    }

    handleFormSubmit = (values) => {
        const {images, files} = this.state;
        return new Promise((resolve, reject) => {
            this.props.createClaim({values, images, files, resolve, history: this.props.history});
        });
    };

    uploadImage = e => {
        let reader = new FileReader();
        let file = e.target.files[0];
        let newState = Object.assign({}, this.state);

        this.uploadFile(file).then((res) => {
            reader.onloadend = () => {
                newState.images.push(res[0].Location);
                newState.previews.push(reader.result);
                this.setState(newState);
            };

            reader.readAsDataURL(file);
        });
    };

    uploadDocument = e => {
        let file = e.target.files[0];
        let newState = Object.assign({}, this.state);

        this.uploadFile(file).then((res) => {
            newState.files.push(res[0].Location);
            newState.filePreviews.push(file);
            this.setState(newState);
        });
    };
    
    uploadFile = file => {
        return new Promise((resolve, reject) => {
            this.props.uploadFile({file, resolve, reject});
        });
    };

    removeFile = (type, index) => {
        let newState = Object.assign({}, this.state);
        newState[type].splice(index, 1);
        if (type === 'images') newState.previews.splice(index, 1);

        this.setState(newState);
    };

    render() {
        const {plans, products, pristine, invalid, submitting, handleSubmit, policyId} = this.props;
        const planOptions = plans.length ? plans.map((plan, key) => ({label: products[key].name, value: plan.id})) : [];
        const previewsRendered = this.state.previews.map((preview, key) =>
            <li key={key} onClick={() => this.removeFile('images', key)}>
                <img src={preview} />
                <span className={styles.closeBtn}> + </span>
            </li>
        );
        const documentsRendered = this.state.filePreviews.map((file, key) =>
            <li key={key} onClick={() => this.removeFile('files', key)}>
                <div>{file.name}</div>
                <span className={styles.closeBtn}> + </span>
            </li>
        );
        return <div className={styles.container}>
            <div className={styles.title}>Report Claim</div>
            <Card className={styles.card}>
                <div className={styles.tableContainer}>
                    <form>
                        <div className={styles.row}>
                            <Field
                                name='policyId'
                                placeholder='Select Contract'
                                required={true}
                                component={ValidationWrapper}
                                children={ValidatedSelect}
                                options={planOptions}
                            />
                        </div>
                        {Boolean(policyId) ? <div>
                            <div className={styles.row}>
                                <Field
                                    name='message'
                                    placeholder='Describe the incident in as much detail as possible '
                                    component={'textarea'}
                                    required={true}
                                    className={styles.contactMessage}
                                />
                            </div>

                            <div className={styles.fileSection}>
                                <div className={styles.uploadWrapper}>
                                    <div className={styles.imageUploadBtn}>
                                        <label htmlFor="img-upload">
                                            <div className={styles.mainButton}>
                                                <img src={ImageBtn}/>UPLOAD PHOTOS
                                            </div>
                                        </label>
                                        <input
                                            className={styles.hidden}
                                            type="file"
                                            id="img-upload"
                                            accept="image/jpeg, image/png"
                                            onChange={this.uploadImage}
                                        />
                                    </div>
                                    <ul className={styles.previewList}>
                                        {previewsRendered}
                                    </ul>
                                </div>
                                <div className={styles.uploadWrapper}>
                                    <div className={styles.fileUploadBtn}>
                                        <label htmlFor="file-upload">
                                            <div className={styles.greyButton}>
                                                <img src={FileBtn}/>UPLOAD FILES
                                            </div>
                                        </label>
                                        <input
                                            className={styles.hidden}
                                            type="file"
                                            id="file-upload"
                                            onChange={this.uploadDocument}
                                            multiple
                                        />
                                    </div>
                                    <ul className={styles.fileList}>
                                        {documentsRendered}
                                    </ul>
                                </div>
                            </div>
                        </div> : null}

                    </form>
                </div>
            </Card>
            <div className={styles.buttonContainer}>
                <Button
                    className={styles.submitButton}
                    disabled={submitting || pristine || invalid}
                    type='submit'
                    onClick={handleSubmit(this.handleFormSubmit)}
                >
                    SUBMIT
                </Button></div>
        </div>
    }
}

ReportClaim = reduxForm({
    form: 'reportClaimForm',
    enableReinitialize: true,
    validate: (values) => {
        const errors = {};

        if (!values.policyId) errors.policyId = 'Required';
        if (!values.message) errors.message = 'Required';

        return errors;
    }
})(ReportClaim);

const selector = formValueSelector('reportClaimForm');

ReportClaim = connect(
    state => {
        const policyId = selector(state, 'policyId');
        return {
            plans: state.profile.plans,
            products: state.auth.userSession.purchasedProducts,
            policyId
        }
    },
    dispatch => ({
        getUserPlans: () => dispatch(getUserPlansRequest()),
        createClaim: payload => dispatch(createClaim(payload)),
        uploadFile: file => dispatch(uploadFile(file))
    })
)(ReportClaim);

export default ReportClaim;