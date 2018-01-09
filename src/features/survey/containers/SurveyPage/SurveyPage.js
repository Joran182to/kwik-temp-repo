import React from 'react';
import {connect} from 'react-redux';
import {getSurveyPageRequest, submitSurveyPageRequest} from '../../actions';
import ProgressMessage from '../../components/ProgressMessage/ProgressMessage';
import SurveyForm from '../../components/SurveyForm/SurveyForm';
import SurveyFinishedMessage from '../../components/SurveyFinishedMessage/SurveyFinishedMessage';

import styles from './SurveyPage.module.scss';

class SurveyPage extends React.Component {
    componentWillMount() {
        this.props.getSurveyPage();
    }

    handleSurveyFormSubmit = (values) => {
        const {submitSurveyPage, history} = this.props;

        return new Promise((resolve, reject) => {
            submitSurveyPage({values, reject, history});
        });
    };

    handleFinishSurveyClick = () => {
        this.props.history.push('/quotes');
    };

    render() {
        const {currentPage, totalPages, questions, questionsOrder, isFetching, isSurveyFinished} = this.props;

        if (isFetching) return null;

        return (
            <div className={styles.container}>
                <ProgressMessage
                    isSurveyFinished={isSurveyFinished}
                    currentQuestion={currentPage}
                    totalQuestions={totalPages} />
                {
                    isSurveyFinished
                        ? <SurveyFinishedMessage
                            onReviewClick={() => ({})}
                            onSubmitClick={this.handleFinishSurveyClick} />
                        : <SurveyForm
                            onSubmit={this.handleSurveyFormSubmit}
                            form={`survey-form-page-${currentPage}`}
                            questions={questions}
                            questionsOrder={questionsOrder}/>
                }
            </div>
        )
    }
}

export default connect(
    (state) => ({
        currentPage: state.survey.currentPage,
        totalPages: state.survey.totalPages,
        questions: state.survey.questions,
        questionsOrder: state.survey.questionsOrder,
        isFetching: state.survey.isFetching,
        isSurveyFinished: state.survey.isSurveyFinished
    }),
    (dispatch) => ({
        getSurveyPage: () => dispatch(getSurveyPageRequest()),
        submitSurveyPage: (payload) => dispatch(submitSurveyPageRequest(payload))
    })
)(SurveyPage)