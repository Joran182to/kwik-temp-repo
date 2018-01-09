import SuccessPage from '../containers/SuccessPage/SuccessPage';
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
    payment: {
        purchasedProducts: []
    },
    auth: {
        user: {
            
        }
    }
};
describe('Success page', () => {

    it('should render', () => {
       
        const store = createMockStore(testState);
        const container = shallowWithStore(<SuccessPage />, store);
        expect(container.length).toEqual(1)
    });
});