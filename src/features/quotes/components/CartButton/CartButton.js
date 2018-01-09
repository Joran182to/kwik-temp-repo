import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from '../../../../base-components/Button/Button';

import styles from './CartButton.module.scss';

export default function CartButton({isInCart, onAddToCart, onRemoveFromCard, className}) {
    return (
        <Button
            className={className || cn(styles.button, {[styles.inCart]: isInCart})}
            onClick={isInCart ? onRemoveFromCard : onAddToCart}
        >
            {
                isInCart
                    ? (className ? '+' : 'REMOVE')
                    : 'ADD TO CART'
            }
        </Button>
    )
}

CartButton.propTypes = {
    onAddToCart: PropTypes.func,
    onRemoveFromCard: PropTypes.func.isRequired,
    isInCart: PropTypes.bool.isRequired
};