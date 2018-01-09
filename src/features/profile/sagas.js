import { take, fork, all, put, call, select } from 'redux-saga/effects'
import * as constants from './constants'
import {callApi, getUserAttributes} from 'common-ui-aws';
import {getUserInfoSuccess, getUserPlansSuccess, setContactFormMessage} from './actions';

function* fetchUserInfo() {
    try {
        const response = yield call(callApi, {path: '/user-info/' + encodeURIComponent(getUserAttributes().user_id)});
        yield put(getUserInfoSuccess(response));
    } catch (e) {}
}

export function* getUserInfo() {
    while (true) {
        yield take(constants.GET_USER_INFO_REQUEST);
        yield call(fetchUserInfo)
    }
}

export function* updateUserInfo() {
    while (true) {
        const {payload: {values, resolve}} = yield take(constants.UPDATE_USER_PROFILE_REQUEST);
        const state = yield select();

        try {
            yield call(callApi, {path: '/user-info/' + encodeURIComponent(getUserAttributes().user_id), method: 'put', body: {data: values, email: values.email || state.profile.userInfo.email}});
            yield call(fetchUserInfo);
            resolve();
        } catch (e) {}
    }
}

export function* getUserPlans() {
    while (true) {
        yield take(constants.GET_USER_PLANS_REQUEST);

        try {
            const response = yield call(callApi, { path: '/policies' });
            yield put(getUserPlansSuccess(response));
        } catch (e) {}
    }
}

export function* sendContactForm() {
    while (true) {
        const {payload: {values, resolve}} = yield take(constants.SEND_CONTACT_FORM_REQUEST);

        try {
            yield call(callApi, {path: '/policies/message', method: 'post', body: {policyId: values.policyId, msgBody: values.message}});
            yield put(setContactFormMessage('Thanks for contacting us!'));
            resolve();
        } catch (e) {}
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)))
    }
}

export default startSagas(getUserInfo, getUserPlans, updateUserInfo, sendContactForm)
