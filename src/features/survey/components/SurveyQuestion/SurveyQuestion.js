import React from 'react';
import {Field} from 'redux-form';
import {questionTypes} from '../../constants';
import SurveyText from '../../components/SurveyText/SurveyText';
import SurveyCheckbox from '../../components/SurveyCheckbox/SurveyCheckbox';
import SurveyDropdown from '../../components/SurveyDropdown/SurveyDropdown';
import SurveyRadio from '../../components/SurveyRadio/SurveyRadio';
import SurveyTag from '../../components/SurveyTag/SurveyTag';

import styles from './SurveyQuestion.module.scss';

const specificQuestions = {
    [questionTypes.TEXT]: {
        component: SurveyText,
        className: styles.text
    },
    [questionTypes.CHECKBOX]: {
        component: SurveyCheckbox,
        className: styles.checkbox
    },
    [questionTypes.DROPDOWN]: {
        component: SurveyDropdown,
        className: styles.dropdown
    },
    [questionTypes.RADIO]: {
        component: SurveyRadio,
        className: styles.radio
    },
    [questionTypes.TAG]: {
        component: SurveyTag,
        className: styles.tag
    }
};

export default function SurveyQuestion({questionItem: {question, choices}}) {
    return (
        <div className={styles.container}>
            <div className={styles.title}>{question.title}</div>
            <Field
                name={question.id}
                component={specificQuestions[question.questionType].component}
                className={specificQuestions[question.questionType].className}
                choices={choices}
            />
        </div>
    )
};