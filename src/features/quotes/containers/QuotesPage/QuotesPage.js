import React from 'react';
import {connect} from 'react-redux';
import {getQuotesRequest, addQuoteToCartRequest, removeQuoteFromCartRequest} from '../../actions';
import QuotesTable from '../../components/QuotesTable/QuotesTable';
import Card from '../../../../base-components/Card/Card';
import Button from '../../../../base-components/Button/Button';
import CartButton from '../../components/CartButton/CartButton';
import _findIndex from 'lodash/findIndex';

import styles from './QuotesPage.module.scss';

class QuotesPage extends React.Component {
    componentWillMount() {
        this.props.getQuotes();
    }

    getTableHeaderCells = () => {
        return [
            '',
            <div className={styles.nameOfPlanHeadingCell}>NAME OF PLAN</div>,
            <div className={styles.premiumHeadingCell}>DESCRIPTION</div>,
            <div className={styles.premiumHeadingCell}>PREMIUM</div>,
            ''
        ]
    };

    render() {
        const { addQuoteToCart, removeQuoteFromCart, history, quotes, cart } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.title}>Based upon your needs, we recommend the following:</div>
                <Card className={styles.card}>
                    <div className={styles.tableContainer}>
                        <QuotesTable
                            header={this.getTableHeaderCells()}
                            quotes={quotes.map(quote => ({
                                name: quote.name,
                                description: quote.description,
                                imageUrl: quote.imageUrl,
                                price: quote.price,
                                action: <CartButton
                                    isInCart={_findIndex(cart, {id: quote.id}) > -1}
                                    onAddToCart={() => addQuoteToCart(quote.id)}
                                    onRemoveFromCard={() => removeQuoteFromCart(quote.id)}
                                />
                            }))}
                        />
                    </div>
                </Card>
                <div className={styles.checkoutButtonContainer}>
                    <Button className={styles.checkoutButton} disabled={!cart.length} onClick={() => history.push('purchase-plan')}>
                        CHECKOUT
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        const purchasedProducts = state.auth.userSession.purchasedProducts;

        return {
            quotes: state.quotes.products.filter(({id}) => !purchasedProducts.find(product => product.id === id)),
            cart: state.quotes.cart
        }
    },
    (dispatch) => ({
        getQuotes: () => dispatch(getQuotesRequest()),
        addQuoteToCart: (quoteId) => dispatch(addQuoteToCartRequest(quoteId)),
        removeQuoteFromCart: (quoteId) => dispatch(removeQuoteFromCartRequest(quoteId))
    })
)(QuotesPage)