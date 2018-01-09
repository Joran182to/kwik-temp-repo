import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../base-components/Button/Button';

import styles from './SurveyFinishedMessage.module.scss';

export default function SurveyFinishedMessage({onSubmitClick, onReviewClick}) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Our backend systems will now generate the right plan for you.
            </div>
            <Button
                onClick={onSubmitClick}
                className={styles.submitButton}
            >
                SUBMIT
            </Button>
            <div className={styles.reviewQuestionsContainer}>
                Or <span className={styles.reviewLink} onClick={onReviewClick}>Review</span> questions
            </div>
        </div>
    )
}

SurveyFinishedMessage.propTypes = {
    onSubmitClick: PropTypes.func.isRequired,
    onReviewClick: PropTypes.func.isRequired
};