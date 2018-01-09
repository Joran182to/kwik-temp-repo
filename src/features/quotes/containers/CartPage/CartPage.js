import React from 'react';
import {connect} from 'react-redux';
import {removeQuoteFromCartRequest} from '../../actions';
import QuotesTable from '../../components/QuotesTable/QuotesTable';
import Card from '../../../../base-components/Card/Card';
import Button from '../../../../base-components/Button/Button';
import CartButton from '../../components/CartButton/CartButton';
import MonthlyPrice from '../../../../base-components/MonthlyPrice/MonthlyPrice';

import styles from '../QuotesPage/QuotesPage.module.scss';

class CartPage extends React.Component {
    
    getTableHeaderCells = () => {
        return [
            '',
            <div className={styles.nameOfPlanHeadingCell}>NAME OF PLAN</div>,
            <div className={styles.premiumHeadingCell}>DESCRIPTION</div>,
            <div className={styles.premiumHeadingCell}>PREMIUM</div>,
            ''
        ]
    };

    renderActionButton(productsLength, isCartEmpty, history) {
        let button = null;
        if (productsLength) {
            button = <Button className={styles.checkoutButton} onClick={() => history.push('purchase-plan')}>
                CHECKOUT
            </Button>
        } else if(isCartEmpty) {
            button = <Button className={styles.checkoutButton} onClick={() => this.props.history.push('/quotes')}>
                Go to quotes
            </Button>;
        }
        return <div className={styles.checkoutButtonContainer}>
           {button}
        </div>
    }

    render() {
        const { removeQuoteFromCart, isCartEmpty, history } = this.props;
        let subTotal = 0;
        const productsInCart = this.props.cart.map(quote => {
            subTotal += quote.price;
            return {
                name: quote.name,
                description: quote.description,
                imageUrl: quote.imageUrl,
                price: quote.price,
                action: <CartButton
                    isInCart={true}
                    className={styles.cartRemoveButton}
                    onRemoveFromCard={() => removeQuoteFromCart(quote.id)}
                />
            }
        });
        
        return (
            <div className={styles.container}>
                <div className={styles.title}>Cart</div>
                <Card className={styles.card}>
                    <div className={productsInCart.length ? styles.tableContainer : styles.emptyCart}>
                        {productsInCart.length ? <QuotesTable
                            className={styles.cart}
                            header={this.getTableHeaderCells()}
                            quotes={productsInCart}
                        /> : 'Cart is empty'}
                    </div>
                    {productsInCart.length ?
                        <div className={styles.subTotal}><span>SUB TOTAL</span> <MonthlyPrice price={subTotal} skipMonth={true}/></div>
                        : null}
                </Card>
                {this.renderActionButton(productsInCart.length, isCartEmpty, history)}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        cart: state.quotes.cart,
        isCartEmpty: state.auth.userSession.cart && !state.auth.userSession.cart.length
    }),
    (dispatch) => ({
        removeQuoteFromCart: (quoteId) => dispatch(removeQuoteFromCartRequest(quoteId))
    })
)(CartPage)