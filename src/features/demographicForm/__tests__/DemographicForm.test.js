import DemographicForm from '../components/DemographicForm/DemographicForm';
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

describe('Demo Form', () => {
    
    it('should render', () => {
       
        const store = createMockStore(initialState);
        const container = shallowWithStore(<DemographicForm />, store);
        expect(container.length).toEqual(1)
    });
});