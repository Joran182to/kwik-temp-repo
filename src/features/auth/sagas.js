import { take, fork, all, call, put } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { SubmissionError } from 'redux-form';
import * as constants from './constants'
import {showMessage, hideMessage} from '../ui/actions';
import {signInSuccess, logInStateChecked} from './actions';
import {messageTypes} from '../ui/constants';
import {callApi, signUp, getNewUser, getUserAttributes, isAuthenticated, signOut, signIn} from 'common-ui-aws';

function* getUserInfo() {
    const userObject = getUserAttributes();
    const userSessionResponse = yield call(callApi, {path: '/user-session'});
    yield put(signInSuccess(userObject, userSessionResponse));
}

export function* signUpSaga() {
    while (true) {
        const {payload: {values, reject, history}} = yield take(constants.SIGN_UP_REQUEST);
        const attributes = {family_name: values.last_name, given_name: values.first_name};

        const authenticationChannel = eventChannel(emit => {
            signUp({email: values.email, password: values.password, attributes}).then((result) => {
                return emit({result});
            }, err => {
                return emit({err});
            });
            return () => ({});
        });

        const {err} = yield take(authenticationChannel);

        if (err) {
            reject(new SubmissionError({_error: err.message}));
        } else {
            yield put(showMessage(messageTypes.VERIFY_ACCOUNT, {userEmail: values.email}));
            history.push('/login');
        }
    }
}

export function* signInSaga() {
    while (true) {
        const {payload: {values, reject}} = yield take(constants.SIGN_IN_REQUEST);

        const user = getNewUser(values.email);

        const authenticationChannel = eventChannel(emit => {
            signIn({
                user: user,
                email: values.email,
                password: values.password,
                rememberMe: true
            }).then((res) => {
                return emit({res});
            }, err => emit({err}));
            return () => ({});
        });

        const {err} = yield take(authenticationChannel);

        if (err) {
            if (err.code === 'UserNotConfirmedException') {
                yield put(showMessage(messageTypes.VERIFY_ACCOUNT, {userEmail: values.email}));
                reject();
            } else {
                reject(new SubmissionError({_error: err.message}));
            }
        } else {
            yield put(hideMessage());
            yield call(getUserInfo);
        }
    }
}

export function* checkLogInState() {
    while (true) {
        yield take(constants.CHECK_LOG_IN_STATE);

        const isAuthenticatedChannel = eventChannel(emit => {
          isAuthenticated().then(res => emit(res));
          return () => ({});
        });

        if (yield take(isAuthenticatedChannel)) {
          yield call(getUserInfo);
        }

        yield put(logInStateChecked());
    }
}

export function* logout() {
    while(true) {
        yield take(constants.LOGOUT);

        signOut();
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)))
    }
}

export default startSagas(signUpSaga, signInSaga, checkLogInState, logout)
