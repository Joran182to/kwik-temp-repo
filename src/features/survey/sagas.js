import { take, fork, all, put, call, select } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form';
import * as constants from './constants'
import {getSurveyPageSuccess, getSurveyPageRequest, submitSurveyPageSuccess} from './actions';
import {callApi} from 'common-ui-aws';

export function* getSurveyPage() {
    while (true) {
        const { pageId } = yield take(constants.GET_SURVEY_PAGE_REQUEST);

        // TODO: use the following line instead when the backend supports specific survey pages
        // const path = `/survey-pages/${pageId ? encodeURIComponent(pageId) : 'leftoff'}`;
        const path = `/survey-pages/leftoff`;

        const response = yield call(callApi, { path });
        yield put(getSurveyPageSuccess(response));
    }
}

export function* submitSurveyPage() {
    while (true) {
        const {payload: {values, reject}} = yield take(constants.SUBMIT_SURVEY_PAGE_REQUEST);

        const { survey } = yield select();
        const answers = [];
        for (let key in values) {
            answers.push({
                questionId: key,
                textResponse: values[key].textResponse,
                choiceDefIds: values[key].choiceDefIds
            });
        }

        try {
            yield call(callApi, {path: `/answers`, method: 'post', body: {answers}});
            yield put(submitSurveyPageSuccess());

            if (survey.nextPageId) {
                yield put(getSurveyPageRequest(survey.nextPageId));
            }
        } catch (e) {
            reject(new SubmissionError({_error: 'Error'}));
        }
    }
}

export function* cancelSurvey() {
    while (true) {
        const {payload: {history}} = yield take(constants.CANCEL_SURVEY_REQUEST);

        try {
            yield call(callApi, {path: '/cancel-survey', method: 'PUT', body: {}});
            history.push('/survey');
        } catch (e) {}
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)))
    }
}

export default startSagas(getSurveyPage, submitSurveyPage, cancelSurvey)
