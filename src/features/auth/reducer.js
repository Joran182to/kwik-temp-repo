import * as constants from './constants';
import * as paymentConstants from '../payment/constants';
import * as quoteConstants from '../quotes/constants';

export const initialState = {
    isLoggedIn: false,
    isLogInStateChecked: false,
    user: {},
    userSession: {}
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case constants.SIGN_IN_SUCCESS:
            return Object.assign({}, state, {
                isLoggedIn: true,
                user: action.user,
                userSession: action.userSession
            });

        case constants.LOG_IN_STATE_CHECKED:
            return Object.assign({}, state, {
                isLogInStateChecked: true
            });

        case constants.LOGOUT:
            return Object.assign({}, state, {
                isLoggedIn: false,
                user: {},
                userSession: {}
            });

        case paymentConstants.SUBMIT_PAYMENT_SUCCESS:
            let newUserSession = Object.assign({}, state.userSession);
            newUserSession.cart = [];
            newUserSession.purchasedProducts = state.userSession.purchasedProducts.concat(action.data.products);
            return Object.assign({}, state, {
                userSession: newUserSession
            });

        case quoteConstants.ADD_QUOTE_TO_CART_SUCCESS: {
            let newUserSession = Object.assign({}, state.userSession);
            return Object.assign({}, state, {
                userSession: newUserSession
            });
        }

        case quoteConstants.REMOVE_QUOTE_FROM_CART_SUCCESS: {
            let newUserSession = Object.assign({}, state.userSession);
            newUserSession.cart.shift();
            return Object.assign({}, state, {
                userSession: newUserSession
            });
        }

        default:
            return state;

    }
};

export default reducer;
