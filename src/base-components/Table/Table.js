import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Table.module.scss';

export default function Table({className, rows, header, bodyClassName}) {
    return (
        <table className={cn(styles.table, className)}>
            <thead>
                <tr>
                    {header.map((title, index) => <th key={index} className={styles.headingCell}>{title}</th>)}
                </tr>
            </thead>
            <tbody className={styles.tableBody}>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={styles.tableRow}>
                        {row.map((cell, cellIndex) => <td className={styles.tableCell} key={cellIndex}>{cell}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

Table.propTypes = {
    className: PropTypes.string,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)),
    header: PropTypes.arrayOf(PropTypes.node)
};