import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import cn from 'classnames';
import arrowImg from '../../assets/icons/arrow.svg';
import crossImg from '../../assets/icons/cross-white.svg';

import * as styles from './SelectMultiple.module.scss';

export default class SelectMultiple extends React.Component {
    renderValue = ({value, onRemove, id}) => {
        return (
            <div className={styles.tag}>
                {value.label}
                <div
                    onMouseDown={(e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove(value);
                    })}
                    className={styles.tagCloseButton}
                >
                    <img alt='' src={crossImg} className={styles.tagCloseImg} />
                </div>
            </div>
        )
    };

    render() {
        const {input, options, selectClassName} = this.props;

        return (
            <Select
                {...input}
                onChange={(options) => input.onChange(options.map(option => option.value))}
                multi={true}
                removeSelected={false}
                deleteRemoves={false}
                backspaceRemoves={false}
                onBlur={() => input.onBlur()}
                clearable={false}
                onBlurResetsInput={false}
                options={options}
                className={cn(styles.select, selectClassName)}
                placeholder={''}
                arrowRenderer={({isOpen}) => (<img alt='' src={arrowImg} className={cn(styles.arrowIcon, {[styles.arrowIconOpened]: isOpen})}/>)}
                valueComponent={this.renderValue}
            />
        )
    }
}

SelectMultiple.propTypes = {
    selectClassName: PropTypes.string,
    input: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string
    }))
};