import { take, fork, all, call } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form';
import * as constants from './constants'
import {callApi, getUserAttributes} from 'common-ui-aws';

export function* sendDemographicForm() {
    while (true) {
        const {payload: {values, email, reject, history}} = yield take(constants.SEND_DEMOGRAPHIC_FORM_REQUEST);
        let body = {
            data: values,
            email
        };

        try {
            yield call(callApi, {path: '/user-info/' + encodeURIComponent(getUserAttributes().user_id), body: body, method: 'put'});
            history.push('/survey');
        } catch (e) {
            reject(new SubmissionError({_error: 'Error'}));
        }
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)))
    }
}

export default startSagas(sendDemographicForm)
