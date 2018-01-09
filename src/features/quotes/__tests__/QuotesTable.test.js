import QuotesTable from '../components/QuotesTable/QuotesTable';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('Quotes table', () => {

    it('should render', () => {
        const wrapper = mount(
            <QuotesTable quotes={[]} header={[]} />
        );
        expect(wrapper.length).toEqual(1)
    });
});