import CartButton from '../components/CartButton/CartButton';
import Button from '../../../base-components/Button/Button';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('Cart button', () => {

    it('should show Remove button if item is within a cart', () => {
        const wrapper = mount(
            <CartButton isInCart={true} onRemoveFromCard={() => {}} />
        );
        const p = wrapper.find(Button);
        expect(p.text()).toBe('REMOVE');
    });
    
    it('should show ADD to cart button if item is not within a cart', () => {
        const wrapper = mount(
            <CartButton isInCart={false} onRemoveFromCard={() => {}} />
        );
        const p = wrapper.find(Button);
        expect(p.text()).toBe('ADD TO CART');
    });
    
});