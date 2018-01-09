import { take, fork, all, put, call } from 'redux-saga/effects'
import * as constants from './constants'
import {callApi, uploadFiles} from 'common-ui-aws';
import {getClaimsSuccess, uploadFileSuccess} from './actions';
import { eventChannel } from 'redux-saga'

function* getClaims() {
    while (true) {
        yield take(constants.GET_CLAIMS_REQUEST);
        const response = yield call(callApi, {path: '/claims'});
        yield put(getClaimsSuccess(response));
    }
}

export function* createClaim() {
    while (true) {
        const {claim: {values: {policyId, message}, files, images, history}} = yield take(constants.CREATE_CLAIM_REQUEST);

        try {
            yield call(callApi, {path: '/claims', method: 'post', body: {files, images, policyId, description: message}});
            history.push('/claims');
        } catch (e) {}
    }
}

export function* uploadFileMethod(file, resolve, reject) {
    const uploadChannel = eventChannel(emit => {
        uploadFiles({
            files: [file],
            path: '/claims'}
        ).then((result) => {
            return emit({result});
        }, err => {
            return emit({err});
        });
        return () => ({});
    });

    const {err, result} = yield take(uploadChannel);

    if (!err) {
        resolve(result);
        yield put(uploadFileSuccess());
    } else {
        reject(err);
    }
}

export function* uploadFile() {
    while (true) {
        const {payload: {file, resolve, reject}} = yield take(constants.UPLOAD_FILE_REQUEST);

        yield fork(uploadFileMethod, file, resolve, reject);
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)))
    }
}

export default startSagas(getClaims, createClaim, uploadFile)
