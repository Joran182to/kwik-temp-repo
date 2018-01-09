import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import styles from './ProfileTabs.module.scss';

export default function ProfileTabs({className, items}) {
    return (
        <div className={cn(styles.tabs, className)}>
            {items.map(({title, link, isActive}, index) => (
                <Link
                    key={index}
                    to={link}
                    className={cn(styles.item, {[styles.activeItem]: isActive}) }
                >
                    {title}
                </Link>
            ))}
        </div>
    )
}

ProfileTabs.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        isActive: PropTypes.bool
    }))
};