import React from 'react';
import {connect} from 'react-redux';
import {getQuotesRequest, addQuoteToCartRequest, removeQuoteFromCartRequest} from '../../../../../../features/quotes/actions';
import styles from './RecommendationsPage.module.scss';
import Message from '../../../../../../base-components/Message/Message';
import Button from '../../../../../../base-components/Button/Button';
import RecommendedProductItem from '../../components/RecommendedProductItem/RecommendedProductItem';

class RecommendationsPage extends React.Component {
    componentWillMount() {
        this.props.getQuotes();
    }

    render() {
        const {recommendedProducts, addQuoteToCart, removeQuoteFromCart} = this.props;

        const hasProductInCart = Boolean(recommendedProducts.find(product => product.isInCart));

        return (
            <div className={styles.container}>
                <Message
                    title='Recommendations'
                    description='We suggest the following coverage. Select one or all to get started with a quote.'/>
                <div className={styles.recommendationsList}>
                    {recommendedProducts.map(product => (
                        <RecommendedProductItem
                            onAddToCart={addQuoteToCart}
                            onRemoveFromCart={removeQuoteFromCart}
                            product={product}
                            key={product.id}/>
                    ))}
                </div>
                <div className={styles.buttonContainer}>
                    <Button disabled={!hasProductInCart}>
                        GET QUOTE
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        recommendedProducts: state.quotes.products
    }),
    dispatch => ({
        getQuotes: () => dispatch(getQuotesRequest()),
        addQuoteToCart: (quoteId) => dispatch(addQuoteToCartRequest(quoteId)),
        removeQuoteFromCart: (quoteId) => dispatch(removeQuoteFromCartRequest(quoteId))
    })
)(RecommendationsPage);