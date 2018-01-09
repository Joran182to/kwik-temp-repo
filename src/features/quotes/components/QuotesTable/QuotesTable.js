import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Table from '../../../../base-components/Table/Table'
import MonthlyPrice from '../../../../base-components/MonthlyPrice/MonthlyPrice';

import styles from './QuotesTable.module.scss';

export default function QuotesTable({header, quotes, className}) {
    return (
        <Table
            className={cn(styles.table, className)}
            header={header}
            rows={quotes.map((quote, index) => {
                let quoteColumns = [];
                quote.imageUrl !== undefined && quoteColumns.push(<img alt='' src={quote.imageUrl} className={styles.quoteLogo} />);
                quote.name !== undefined && quoteColumns.push(<div className={styles.quoteName}>{quote.name}</div>);
                quote.effectiveDate !== undefined && quoteColumns.push(<div className={styles.date}>{quote.effectiveDate}</div>);
                quote.expiryDate !== undefined && quoteColumns.push(<div className={styles.date}>{quote.expiryDate}</div>);
                quote.date !== undefined && quoteColumns.push(<div className={styles.date}>{quote.date}</div>);
                quote.description !== undefined && quoteColumns.push(<div className={styles.quoteDescription}>{quote.description}</div>);
                quote.updateDate !== undefined && quoteColumns.push(<div className={styles.date}>{quote.updateDate}</div>);
                quote.price !== undefined && quoteColumns.push(<MonthlyPrice className={styles.quotePrice} price={quote.price} />);
                quote.action !== undefined && quoteColumns.push(<div className={styles.quoteActionContainer}>{quote.action}</div>);
                quote.status !== undefined && quoteColumns.push(<div className={styles.status}>{quote.status}</div>);

                return quoteColumns;
            })}
        />
    )
}

QuotesTable.propTypes = {
    header: PropTypes.array.isRequired,
    quotes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
        price: PropTypes.number,
        action: PropTypes.node
    }))
};