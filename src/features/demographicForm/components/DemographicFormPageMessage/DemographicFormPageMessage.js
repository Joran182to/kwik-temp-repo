import React from 'react';
import PropTypes from 'prop-types';
import Message from '../../../../base-components/Message/Message';

import styles from './DemographicFormPageMessage.module.scss';

export default function DemographicFormPageMessage({userName}) {

    return (
        <Message
            title={`Hello, ${userName}`}
            description={<div>Tell us a little about you. The entire process takes less than five minutes! </div>}/>
    )
};

DemographicFormPageMessage.propTypes = {
    userName: PropTypes.string
};