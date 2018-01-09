import * as constants from './constants';
import _findIndex from 'lodash/findIndex'

const initialState = {
    purchasedProducts: [],
    purchasedPolicies: [],
    savedCards: [],
    isFetchingSavedCards: false
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        
        case constants.SUBMIT_PAYMENT:
            return Object.assign({}, state, {
                paymentLoading: true
            });
        
        case constants.SUBMIT_PAYMENT_SUCCESS:
            return Object.assign({}, state, {
                paymentLoading: false,
                purchasedPolicies : action.data.policies,
                purchasedProducts: action.data.products
            });

        case constants.GET_SAVED_CARDS:
            return Object.assign({}, state, {
                isFetchingSavedCards: true,
            });
        
        case constants.GET_SAVED_CARDS_SUCCESS:
            return Object.assign({}, state, {
                savedCards : action.cards.slice(),
                isFetchingSavedCards: false
            });

        case constants.DELETE_CARD_SUCCESS:
            let newCards = state.cards.slice();
            newCards.splice(_findIndex(newCards, {id: action.id}), 1);
            return Object.assign({}, state, {
                savedCards : newCards
            });

        default:
            return state;

    }
};

export default reducer;