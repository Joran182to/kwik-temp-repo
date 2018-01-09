import { take, fork, all, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import {history}  from 'react-router-dom';
import * as constants from './constants'
import {submitPaymentSuccess, getSavedCardsSuccess, deleteCardSuccess, getSavedCards} from './actions';
import {callApi} from 'common-ui-aws';
import Braintree from 'braintree-web';

export function* createCard() {
    while (true) {
        const {payload, payload: {resolve}} = yield take(constants.CREATE_CARD);
        let payloadCopy = Object.assign({}, payload);
        payloadCopy.token = yield call(generateBraintreeToken);
        const result = yield call(generateNonce, payloadCopy);
        if (!result.err) {
            let request = {
                nonce: result.response.creditCards[0].nonce,
                shouldSavePaymentMethod: true
            };

            try {
              yield call(callApi, { path: `/payment-methods`, body: request, method: 'POST' });
              yield put(getSavedCards());
              resolve();
            } catch (e) {}
        }

    }
}

export function* deleteCard() {
    while (true) {
        const action = yield take(constants.DELETE_CARD);

        try {
            yield call(callApi, {path: `/payment-methods/` + action.token, method: 'DELETE'});
            yield put(deleteCardSuccess(action.token));
        } catch (e) {}
    }
}

export function* getSavedCardsSaga() {
    while (true) {
        yield take(constants.GET_SAVED_CARDS);

        try {
            const response = yield call(callApi, {path: `/payment-methods`});
            yield put(getSavedCardsSuccess(response.paymentMethods.CreditCard || []));
        } catch (e) {}
    }
}

export function* generateBraintreeToken() {
    try {
      const response = yield call(callApi, {path: `/payments/token`, method: 'post'});
      return response.token;
    } catch (e) {}
}

export function* generateNonce(action) {
    const userChannel = eventChannel(emit => {
        Braintree.client.create({
            authorization: action.token
        }, function (err, client) {
            client.request({
                endpoint: 'payment_methods/credit_cards',
                method: 'post',
                data: {
                    creditCard: {
                        number: action.values.card_number,
                        expiration_date: action.values.expiry_month.replace(/ /g, ''),
                        cvv: action.values.cvv
                    }
                }
            }, function (err, response) {
                emit({err, response});
            });
        });

        return () => ({});
    });

    return yield take(userChannel);
}


export function* sendPaymentTransaction(request, history) {
    try {
        const response = yield call(callApi, {path: `/payments`, method: 'post', body: request});
        yield put(submitPaymentSuccess(response));
        history.push('/success');
    } catch (e) {}
}

export function* submitPaymentFlow() {
    while (true) {
        let action = yield take(constants.SUBMIT_PAYMENT);
        action.token = yield call(generateBraintreeToken, action);
        if (action.values.paymentMethodToken) {
            let request = {
                paymentMethodToken: action.values.paymentMethodToken
            };

            yield call(sendPaymentTransaction, request, action.history);
        } else {
            const result = yield call(generateNonce, action);
            if (!result.err) {
                let request = {
                    nonce: result.response.creditCards[0].nonce,
                    shouldSavePaymentMethod: action.values.shouldSavePaymentMethod && action.values.shouldSavePaymentMethod[0]
                };
                yield call(sendPaymentTransaction, request, action.history);
            }
        }

    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)))
    }
}

export default startSagas(submitPaymentFlow, getSavedCardsSaga, createCard, deleteCard)
