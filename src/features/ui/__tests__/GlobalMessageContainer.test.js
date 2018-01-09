import GlobalMessageContainer from '../containers/GlobalMessageContainer/GlobalMessageContainer';
import VerifyAccountMessage from '../containers/VerifyAccountMessage/VerifyAccountMessage';
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
const initialState = {
    ui: {
        messageType: 'VERIFY_ACCOUNT'
    }
};

describe('VerifyAccountMessage', () => {
    
    it('should render', () => {
       
        const store = createMockStore(initialState);
        const container = shallowWithStore(<GlobalMessageContainer  />, store);
        expect(container.length).toEqual(1);
    });
    
    it('should have proper message', () => {
       
        const store = createMockStore(initialState);
        const container = shallowWithStore(<GlobalMessageContainer />, store);
        expect(container.dive().find(VerifyAccountMessage).length).toEqual(1);
    });
});