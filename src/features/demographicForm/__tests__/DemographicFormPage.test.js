import DemographicFormPage from '../containers/DemographicFormPage/DemographicFormPage';
import DemographicFormPageMessage from '../components/DemographicFormPageMessage/DemographicFormPageMessage';
import DemographicForm from '../components/DemographicForm/DemographicForm';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {createMockStore} from 'redux-test-utils';
import Enzyme, { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import configureStore from 'redux-mock-store'
const shallowWithStore = (component, store) => {
    const context = {
        store
    };
    return shallow(component, { context });
};
const initialState = {
    auth: {
        user: {
            given_name: 'test'
        },
        userSession: {
            hasDemoInfo: false
        }
    },
    history: []
};

describe('Demo Form page', () => {
    let store, wrapper;
    const mockStore = configureStore();

    beforeEach(()=>{
        store = mockStore(initialState);
        wrapper = mount( <Provider store={store}><DemographicFormPage /></Provider> )
    });
    
    it('should render', () => {
       
        const store = createMockStore(initialState);
        const container = shallowWithStore(<DemographicFormPage />, store);
        expect(container.length).toEqual(1)
    });
    
    it('should have alert message', () => {

        const message = wrapper.find(DemographicFormPageMessage);
        expect(message.length).toEqual(1)
    });
    
    it('should have demo form', () => {

        const form = wrapper.find(DemographicForm);
        expect(form.length).toEqual(1)
    });
});