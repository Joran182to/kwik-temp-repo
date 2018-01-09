import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

import styles from './Tabs.module.scss';

export default class Tabs extends React.Component {
    componentWillMount() {
        this.dropdowns = {};
    }

    handleDropdownItemClick = (link) => () => {
        this.dropdowns[link].getDropdown().hide();
    };

    render() {
        const {className, items} = this.props;

        return (
            <div className={cn(styles.tabs, className)}>
                {items.map(({title, link, isActive, dropdown, dropdownClassName, onClick}, index) => (
                    <div
                        key={index}
                        className={cn(styles.item, {[styles.activeItem]: isActive})}
                    >
                        {
                            link
                                ? <Link to={link}>
                                    {title}
                                </Link>
                                : <span onClick={onClick} className={styles.link}>{title}</span>
                        }

                        {
                            dropdown
                            && <DropdownMenu className={dropdownClassName} ref={node => this.dropdowns[link] = node} content={<div className={styles.dropdownMenu}>
                                {dropdown.map((dropdownItem, index) => (
                                    <Link
                                        to={dropdownItem.link}
                                        key={index}
                                        className={styles.dropdownLink}
                                        onClick={this.handleDropdownItemClick(link)}
                                    >
                                        {dropdownItem.title}
                                    </Link>
                                ))}
                            </div>}
                            />
                        }
                    </div>
                ))}
            </div>
        )
    }
}

Tabs.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        dropdown: PropTypes.arrayOf(PropTypes.shape({
            link: PropTypes.string,
            title: PropTypes.string
        })),
        isActive: PropTypes.bool
    }))
};