import reducers from '../reducer'
import * as constants from '../constants'
const initialState = {
    products: [],
    cart: []
};
const recommendedProducts = [
    {
        "id": 1,
        "name": "foo",
        "isInCart": false
    },
    {
        "id": 2,
        "isInCart": true
    }
];

describe('quotes reducer', () => {

    it('should update state after receiving quotes', () => {

        expect(
            reducers({products: initialState.products}, {
                type: constants.GET_QUOTES_SUCCESS,
                quotes: recommendedProducts
            })
        ).toEqual({products: recommendedProducts})
    });
    
    
    it('should update state after adding product to cart', () => {
        let expectedProducts = recommendedProducts.slice();
        expectedProducts[0].isInCart = true;
        expectedProducts.push(expectedProducts[0]);
        expect(
            reducers({cart: recommendedProducts, products: recommendedProducts}, {
                type: constants.ADD_QUOTE_TO_CART_SUCCESS,
                quoteId: 1
            })
        ).toEqual({cart: expectedProducts, products: recommendedProducts})
    });
    
    it('should update state after removing product from cart', () => {
        let expectedCart = recommendedProducts.slice(1);
        let expectedProducts = recommendedProducts.slice();
        expectedProducts[0].isInCart = false;
        expect(
            reducers({cart: recommendedProducts, products: recommendedProducts}, {
                type: constants.REMOVE_QUOTE_FROM_CART_SUCCESS,
                quoteId: 1
            })
        ).toEqual({cart: expectedCart, products: expectedProducts})
    });
});