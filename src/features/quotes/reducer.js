import * as constants from './constants';
import * as authConstants from '../auth/constants';

const initialState = {
    products: [],
    cart: [],
    hasPendingProducts: false
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case constants.GET_QUOTES_SUCCESS:
            return Object.assign({}, state, {
                products: action.quotes
            });

        case authConstants.SIGN_IN_SUCCESS:
            return Object.assign({}, state, {
                cart: action.userSession.cart,
                hasPendingProducts: Boolean(action.userSession.recommendedProducts.filter(recommendedProduct => {
                    return !action.userSession.purchasedProducts.find(purchasedProduct => purchasedProduct.id === recommendedProduct.id)
                }).length > 0)
            });

        case constants.ADD_QUOTE_TO_CART_SUCCESS:
            let newCart = state.cart.slice();
            return Object.assign({}, state, {
                products: state.products.map(quote => {
                    if (quote.id === action.quoteId) {
                        newCart.push(Object.assign({}, quote));
                        return Object.assign({}, quote, {isInCart: true});
                    } else {
                        return quote
                    }
                }),
                cart: newCart
            });
        
        case constants.REMOVE_QUOTE_FROM_CART_SUCCESS:
            return Object.assign({}, state, {
                products: state.products.map(quote => {
                    if (quote.id === action.quoteId) {
                        return Object.assign({}, quote, {isInCart: false});
                    } else {
                        return quote
                    }
                }),
                cart: state.cart.filter(product => product.id !== action.quoteId)
            });

        default:
            return state;

    }
};

export default reducer;