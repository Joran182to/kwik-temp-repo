import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import arrowImg from '../../assets/icons/arrow.svg';

import styles from './DropdownMenu.module.scss';

export default class DropdownMenu extends React.Component {
    getDropdown = () => this.dropdown;

    render() {
        const {className, content, title} = this.props;
        return (
            <Dropdown ref={node => this.dropdown = node} className={cn(styles.container, className)}>
                <DropdownTrigger>{title} <img alt='' className={styles.arrow} src={arrowImg} /></DropdownTrigger>
                <DropdownContent>
                    {content}
                </DropdownContent>
            </Dropdown>
        )
    }
}

DropdownMenu.propTypes = {
    className: PropTypes.string,
    content: PropTypes.node
};