import * as constants from './constants';

export const getQuotesRequest = () => ({
    type: constants.GET_QUOTES_REQUEST
});

export const getQuotesSuccess = (quotes) => {
return {
    type: constants.GET_QUOTES_SUCCESS,
    quotes
}};

export const getCartRequest = () => ({
    type: constants.GET_CART_REQUEST
});

export const getCartSuccess = (cart) => ({
    type: constants.GET_CART_SUCCESS,
    cart
});

export const addQuoteToCartRequest = (quoteId) => ({
    type: constants.ADD_QUOTE_TO_CART_REQUEST,
    quoteId
});

export const addQuoteToCartSuccess = (quoteId) => ({
    type: constants.ADD_QUOTE_TO_CART_SUCCESS,
    quoteId
});

export const removeQuoteFromCartRequest = (quoteId) => ({
    type: constants.REMOVE_QUOTE_FROM_CART_REQUEST,
    quoteId
});

export const removeQuoteFromCartSuccess = (quoteId) => ({
    type: constants.REMOVE_QUOTE_FROM_CART_SUCCESS,
    quoteId
});