import * as constants from './constants';

export const getSavedCards = () => ({
    type: constants.GET_SAVED_CARDS
});

export const getSavedCardsSuccess = cards => ({
    type: constants.GET_SAVED_CARDS_SUCCESS,
    cards
});

export const createCard = payload => ({
    type: constants.CREATE_CARD,
    payload
});

export const submitPayment = (values, history) => ({
    type: constants.SUBMIT_PAYMENT,
    values,
    history
});

export const submitPaymentSuccess = data => ({
    type: constants.SUBMIT_PAYMENT_SUCCESS,
    data
});

export const deleteCard = token => ({
    type: constants.DELETE_CARD,
    token
});

export const deleteCardSuccess = token => ({
    type: constants.DELETE_CARD_SUCCESS,
    token
});