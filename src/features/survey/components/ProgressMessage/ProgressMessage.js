import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Message from '../../../../base-components/Message/Message';

import styles from './ProgressMessage.module.scss';

export default function ProgressMessage({currentQuestion, totalQuestions, isSurveyFinished}) {
    const barItems = [];
    for (let i = 0; i < totalQuestions; i++) {
        barItems.push(<div key={i} className={cn(styles.bar, {[styles.active]: i < currentQuestion })}></div>)
    }

    let title;

    if (isSurveyFinished) {
        title = <div>
            Super, All done ! You can choose to <span className={styles.link}>review</span> your answers or submit to recieve your optimum plan.
        </div>
    } else if (currentQuestion < (totalQuestions / 2)) {
        title = 'A few questions to understand the perfect plan for your needs.'
    } else {
        title = 'You are doing great! Just a few more questions.'
    }

    return (
        <Message description={
            <div>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.counter}>
                    {`${currentQuestion}/${totalQuestions} Questions`}
                </div>
                <div className={styles.barsCointainer}>
                    {barItems}
                </div>
            </div>}/>
    )
};

ProgressMessage.propTypes = {
    currentQuestion: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    isSurveyFinished: PropTypes.bool.isRequired
};