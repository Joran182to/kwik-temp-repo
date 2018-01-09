import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Card from '../../../../base-components/Card/Card';
import HomePageButton from '../../components/HomePageButton/HomePageButton';

import styles from './HomePageCard.module.scss';

export default function HomePageCard({className, icon, iconTitle, title, body, buttons}) {
    return (
        <Card className={cn(styles.card, className)}>
            <div className={styles.iconContainer}>
                {icon}
                {iconTitle}
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.bodyContainer}>{body}</div>
            <div className={styles.buttonsContainer}>
                {buttons.map((button, index) => (
                    <HomePageButton
                        key={index}
                        className={styles.button}
                        iconUrl={button.iconUrl}
                        iconClassName={button.iconClassName}
                        title={button.title}
                        onClick={button.onClick}
                    />
                ))}
            </div>
        </Card>
    )
}

HomePageCard.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.node.isRequired,
    iconTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        iconUrl: PropTypes.string.isRequired,
        iconClassName: PropTypes.string,
        onClick: PropTypes.func.isRequired
    }))
};