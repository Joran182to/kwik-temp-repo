import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Message from '../../../../base-components/Message/Message';

import styles from './CompleteSurveyMessage.module.scss';

export default function CompleteSurveyMessage({className, userName, onClose, onCompleteSurvey, onCancelSurvey}) {
    return (
        <Message
            className={cn(styles.message, className)}
            title={`Hello, ${userName}`}
            onCloseClick={onClose}
            description={<div>
                You have a form thats waiting to be completed. Click <span onClick={onCompleteSurvey} className={styles.link}>here</span> to complete  it or <span onClick={onCancelSurvey} className={styles.link}>here</span> to cancel and start a fresh application.
            </div>}/>
    )
}

CompleteSurveyMessage.propTypes = {
    className: PropTypes.string,
    userName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onCompleteSurvey: PropTypes.func.isRequired,
    onCancelSurvey: PropTypes.func.isRequired
};