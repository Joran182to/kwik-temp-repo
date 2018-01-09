import React from 'react';
import {connect} from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import Button from '../../../../base-components/Button/Button';
import SurveyQuestion from '../../components/SurveyQuestion/SurveyQuestion';
import getVisibleQuestions from '../../helpers/getVisibleQuestions';
import isAnswer from '../../helpers/isAnswer';

import styles from './SurveyForm.module.scss';

class SurveyForm extends React.Component {
    handleFormSubmit = (values) => {
        const { onSubmit, questions, questionsOrder } = this.props;
      
        const requiredValues = {};
        const visibleQuestions = getVisibleQuestions(values, questions, questionsOrder);
        visibleQuestions.forEach(questionItem => {
            const questionName = questionItem.question.id;
            const choiceDefIds = Array.isArray(values[questionName]) ? values[questionName] : [values[questionName]];
            requiredValues[questionName] = {textResponse: !questionItem.choices.length ? values[questionName] : null,
                choiceDefIds: questionItem.choices.length ? choiceDefIds : []};
        });
        return onSubmit(requiredValues);
    };

    render() {
        const { error, submitting, invalid, handleSubmit, allValues, questions, questionsOrder } = this.props;

        const visibleQuestions = getVisibleQuestions(allValues, questions, questionsOrder);

        return (
            <form
                className={styles.form}
                onSubmit={handleSubmit(this.handleFormSubmit)}
            >

                {visibleQuestions.map(questionItem => <SurveyQuestion key={questionItem.question.id} questionItem={questionItem}/>)}

                {error && <div className={styles.formError}>{error}</div>}

                <div className={styles.submitButtonContainer}>
                    <Button
                        className={styles.submitButton}
                        disabled={submitting || invalid}
                        type='submit'
                    >
                        NEXT
                    </Button>
                </div>
            </form>
        )
    }
}

const selector = (form, ...other) => (formValueSelector(form))(...other);

SurveyForm =  reduxForm({
    validate: (values, props) => {
        const err = {};
        const visibleQuestions = getVisibleQuestions(values, props.questions, props.questionsOrder);
        visibleQuestions.forEach(questionItem => {
            const questionName = questionItem.question.id;
            if (!isAnswer(values[questionName])) {
                err[questionName] = 'Required';
            }
        });

        return err;
    }
})(SurveyForm);

SurveyForm = connect((state, initialProps) => {
    const values = {};

    initialProps.questions.forEach(item => values[item.question.id] = selector(initialProps.form, state, item.question.id));

    return {
        allValues: values
    }
})(SurveyForm);

export default SurveyForm;