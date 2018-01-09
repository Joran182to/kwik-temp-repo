import { take, fork, all, put, call } from 'redux-saga/effects'
import * as constants from './constants'
import {callApi} from 'common-ui-aws';
import {getQuotesSuccess, addQuoteToCartSuccess, removeQuoteFromCartSuccess, getCartSuccess} from './actions';

export function* getQuotes() {
    while (true) {
        yield take(constants.GET_QUOTES_REQUEST);
        const response = yield call(callApi, {path: '/products/recommended-products'});
        yield put(getQuotesSuccess(response));
    }
}

export function* getCart() {
    while (true) {
        yield take(constants.GET_CART_REQUEST);
        const response = yield call(callApi, {path: '/products/recommended-products'});
        yield put(getQuotesSuccess(response));
    }
}

export function* addQuoteToCart() {
    while (true) {
        const {quoteId} = yield take(constants.ADD_QUOTE_TO_CART_REQUEST);

        try {
            yield call(callApi, {path: `/user-session/cart/${encodeURIComponent(quoteId)}`, method: 'POST', body:{quoteId: quoteId}});
            yield put(addQuoteToCartSuccess(quoteId));
        } catch (e) {}
    }
}

export function* removeQuoteFromCart() {
    while (true) {
        const {quoteId} = yield take(constants.REMOVE_QUOTE_FROM_CART_REQUEST);

        try {
            yield call(callApi, {path: `/user-session/cart/${encodeURIComponent(quoteId)}`, method: 'DELETE'});
            yield put(removeQuoteFromCartSuccess(quoteId));
        } catch (e) {}
    }
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield all(sagas.map(saga => fork(saga)))
    }
}

export default startSagas(getQuotes, addQuoteToCart, removeQuoteFromCart, getCart)
