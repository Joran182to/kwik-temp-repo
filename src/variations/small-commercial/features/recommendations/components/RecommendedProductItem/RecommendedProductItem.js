import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Card from '../../../../../../base-components/Card/Card';
import Checkbox from '../../../../../../base-components/Checkbox/Checkbox';

import styles from './RecommendedProductItem.module.scss';

export default class RecommendedProductItem extends React.Component {
    constructor() {
        super();

        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    }

    handleAddToCart() {
        const {product, onAddToCart} = this.props;

        onAddToCart(product.id);
    }

    handleRemoveFromCart() {
        const {product, onRemoveFromCart} = this.props;

        onRemoveFromCart(product.id);
    }

    render() {
        const {product: {name, description, imageUrl, isInCart}} = this.props;

        return (
            <Card className={styles.container}>
                <div className={styles.imageAndCheckboxContainer}>
                    <img src={imageUrl} className={styles.image} />
                    <Checkbox isChecked={isInCart} onCheck={this.handleAddToCart} onUncheck={this.handleRemoveFromCart}/>
                </div>
                <div className={styles.name}>{name}</div>
                <div className={styles.description}>{description}</div>
            </Card>
        )
    }
}

RecommendedProductItem.propTypes = {
    product: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        isInCart: PropTypes.bool.isRequired
    }),
    onAddToCart: PropTypes.func.isRequired,
    onRemoveFromCart: PropTypes.func.isRequired
};