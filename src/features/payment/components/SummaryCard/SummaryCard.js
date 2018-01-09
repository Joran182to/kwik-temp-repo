import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './SummaryCard.module.scss';

export default function SummaryCard({products = []}) {
    let subtotalPrice = 0;
    const renderedProducts = products.map((product, key) => {
        subtotalPrice += product.price;
        const priceParts = product.price.toFixed(2).toString().split('.');
        return <li key={key}>
            <div className={styles.leftBlock}>
                <img src={product.imageUrl} />
                <div className={styles.productName}>{product.name}</div>
            </div>
            <div className={styles.number}>${priceParts[0]}<span className={styles.fixed}> .{priceParts[1]}</span></div>
        </li>;
    });

    const subtotalPriceParts = subtotalPrice.toFixed(2).toString().split('.');
    return (
        <div className={styles.card}>
            <h2>Summary</h2>
            <ul>
                {renderedProducts}
            </ul>
            <div className={styles.summaryRow}>
                <h4>SUBTOTAL</h4><div className={styles.number}>${subtotalPriceParts[0]}<span className={styles.fixed}> .{subtotalPriceParts[1]}</span></div>
            </div>
            <div className={styles.summaryRow}>
                <h4>TAX</h4><div className={styles.number}>NA</div>
            </div>
            <footer className={styles.footer}>
                <h4>TOTAL</h4> <div className={styles.totalNumber}> ${subtotalPrice.toFixed(2)} </div>
            </footer>
        </div>
    )
}

SummaryCard.propTypes = {
    className: PropTypes.string
};
