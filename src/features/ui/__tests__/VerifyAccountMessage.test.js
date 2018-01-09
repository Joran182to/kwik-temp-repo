import VerifyAccountMessage from '../containers/VerifyAccountMessage/VerifyAccountMessage';
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

describe('VerifyAccountMessage', () => {
    
    it('should render', () => {
       
        const store = createMockStore(initialState);
        const container = shallowWithStore(<VerifyAccountMessage />, store);
        expect(container.length).toEqual(1);
    });
    
    it('should have message', () => {
       
        const store = createMockStore(initialState);
        const container = shallowWithStore(<VerifyAccountMessage givenName={'John'} />, store);
        expect(container.dive().find(Message).length).toEqual(1);
    });
});