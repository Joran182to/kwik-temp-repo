import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from '../Button/Button';
import closeImg from '../../assets/icons/close-white.png';

import styles from './Message.module.scss';

export default function Message({className, title, description, onCloseClick}) {
    return (
        <div className={cn(styles.message, className)}>
            <div className={styles.innerContainer}>
                <div className={styles.textsContainer}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.description}>{description}</div>
                </div>
                {
                    onCloseClick
                        && <Button className={styles.closeButton} onClick={onCloseClick}>
                            <img alt='' src={closeImg} className={styles.closeImg}/>
                        </Button>
                }
            </div>
        </div>
    )
};

Message.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.node.isRequired,
    onCloseClick: PropTypes.func
};