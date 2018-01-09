import React from 'react';
import cn from 'classnames';
import Button from '../../../../base-components/Button/Button';
import PropTypes from 'prop-types';

import styles from './HomePageButton.module.scss';

export default function HomePageButton({className, iconUrl, iconClassName, title, onClick}) {
    return (
        <Button className={cn(styles.button, className)} onClick={onClick}>
            <img alt='' src={iconUrl} className={cn(styles.icon, iconClassName)} />
            {title}
        </Button>
    )
}

HomePageButton.propTypes = {
    className: PropTypes.string,
    iconUrl: PropTypes.string.isRequired,
    iconClassName: PropTypes.string,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};