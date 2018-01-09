import { take, fork, all, put, call, select } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form';
import * as constants from './constants'
import {callApi} from 'common-ui-aws';

export function* saveProfile() {
    while (true) {
        const { profile } = yield take(constants.SAVE_PROFILE_REQUEST);
        const state =  yield select();
        const userId = state.auth.user.user_id;

        const response = yield call(callApi, { path: `/user-info/${userId}`, method: 'put', body: {...profile} });
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)))
    }
}

export default startSagas(saveProfile)
