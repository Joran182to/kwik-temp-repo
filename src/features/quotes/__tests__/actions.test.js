import * as actions from '../actions'
import * as constants from '../constants'

const recommendedProducts = [
    {
        "id": 1,
        "name": "foo",
        "description": "foo bar biz baz.",
        "imageUrl": "http://www.clker.com/cliparts/O/v/c/b/i/6/generic-logo.svg",
        "price": 132.21,
        "isInCart": false
    },
    {
        "id": 2,
        "name": "ASURION \nRenters Insurance",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "imageUrl": "http://www.clker.com/cliparts/O/v/c/b/i/6/generic-logo.svg",
        "price": 65,
        "isInCart": true
    }
];

const quoteId = 1;

describe('quotes actions', () => {

    it('should have an action to request quotes(recommended products)', () => {

        const expectedAction = {
            type: constants.GET_QUOTES_REQUEST
        };

        expect(actions.getQuotesRequest()).toEqual(expectedAction);
    });

    it('should have an action to receive quotes(recommended products)', () => {

        const expectedAction = {
            type: constants.GET_QUOTES_SUCCESS,
            quotes: recommendedProducts
        };

        expect(actions.getQuotesSuccess(recommendedProducts)).toEqual(expectedAction)
    });
    
    it('should have an action to request products from cart', () => {

        const expectedAction = {
            type: constants.GET_CART_REQUEST
        };

        expect(actions.getCartRequest()).toEqual(expectedAction);
    });

    it('should have an action to receive products from cart', () => {

        const expectedAction = {
            type: constants.GET_CART_SUCCESS,
            cart: recommendedProducts
        };

        expect(actions.getCartSuccess(recommendedProducts)).toEqual(expectedAction);
    });

    it('should have an action to add product to cart', () => {

        const expectedAction = {
            type: constants.ADD_QUOTE_TO_CART_REQUEST,
            quoteId: quoteId
        };

        expect(actions.addQuoteToCartRequest(quoteId)).toEqual(expectedAction);
    });

    it('should have an action to remove product from cart', () => {
        const expectedAction = {
            type: constants.REMOVE_QUOTE_FROM_CART_REQUEST,
            quoteId: quoteId
        };

        expect(actions.removeQuoteFromCartRequest(quoteId)).toEqual(expectedAction);
    });
    
});