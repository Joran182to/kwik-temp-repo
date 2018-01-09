import CartPage from '../containers/CartPage/CartPage';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {createMockStore} from 'redux-test-utils';
import Enzyme, { mount, shallow } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
const shallowWithStore = (component, store) => {
    const context = {
        store
    };
    return shallow(component, { context });
};
const testState = {
    quotes: {
        cart: [],
        isCartEmpty: true
    },
    auth: {
        userSession: {
            lastKnownRecommendedProducts: []
        }
    }
};
describe('Cart page', () => {

    it('should render', () => {
       
        const store = createMockStore(testState);
        const container = shallowWithStore(<CartPage />, store);
        expect(container.length).toEqual(1)
    });
});