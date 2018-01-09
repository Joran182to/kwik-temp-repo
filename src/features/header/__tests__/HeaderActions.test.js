import HeaderActions from '../components/HeaderActions/HeaderActions';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import DropdownMenu from '../../../base-components/DropdownMenu/DropdownMenu';
import Enzyme, { mount, shallow } from 'enzyme';
import styles from '../components/HeaderActions/HeaderActions.module.scss';

import {Link} from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() });
let props = {
    isLoggedIn: true,
    onLogoutClick: () => {},
    signInLink: 'signInLink'
};

describe('Header Actions component', () => {
    
    it('should render', () => {
       
        const container = shallow(<HeaderActions {...props} />);
        expect(container.length).toEqual(1)
    });
    
    it('should render dropdown menu if user logged in', () => {

        const container = shallow(<HeaderActions {...props} />);
        expect(container.find(DropdownMenu).length).toEqual(1)
    });
    
    it('should render signin link with if user not logged in', () => {
        props.isLoggedIn = false;
        const container = shallow(<HeaderActions {...props} />);
        expect(container.find(DropdownMenu).length).toEqual(0);
        expect(container.find(Link).first().props().to).toEqual(props.signInLink);
    });
});