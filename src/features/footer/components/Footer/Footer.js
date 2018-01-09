import React from 'react';
import ProPTypes from 'prop-types';
import cn from 'classnames';
import footerImg from '../../../../assets/images/footer.svg';

import * as styles from './Footer.module.scss';

export default function Footer({className}) {
    return (
        <div className={cn(styles.footer, className)}>
            <span>powered by </span>
            <img alt='' src={footerImg} className={styles.footerImg} />
        </div>
    )
}

Footer.propTypes = {
    className: ProPTypes.string
};