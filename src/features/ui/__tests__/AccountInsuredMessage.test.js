import AccountInsuredMessage from '../containers/AccountInsuredMessage/AccountInsuredMessage';
import Message from '../../../base-components/Message/Message';
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
};

describe('AccountInsuredMessage', () => {
    
    it('should render', () => {
       
        const store = createMockStore(initialState);
        const container = shallowWithStore(<AccountInsuredMessage />, store);
        expect(container.length).toEqual(1)
    });
    
    it('should have message with proper greeting', () => {
       
        const store = createMockStore(initialState);
        const container = shallowWithStore(<AccountInsuredMessage givenName={'John'} />, store);
        expect(container.dive().find(Message).first().props().title).toEqual('Congrats John,');
    });
});