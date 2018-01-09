import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Message from '../../../../base-components/Message/Message';

import styles from './QuotesAvailable.module.scss';

export default function QuotesAvailable({className, userName, onClose, onShowQuotes}) {
    return (
        <Message
            className={cn(styles.message, className)}
            title={`Hello, ${userName}`}
            onCloseClick={onClose}
            description={<div>
                You have customized quotes waiting for you. Click  <span onClick={onShowQuotes} className={styles.link}>here</span> to choose.
            </div>}/>
    )
}

QuotesAvailable.propTypes = {
    className: PropTypes.string,
    userName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onShowQuotes: PropTypes.func.isRequired
};