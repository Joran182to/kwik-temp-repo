import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FileBtn from '../../assets/icons/upload.svg';

import styles from './DocumentsInput.module.scss';

export default class DocumentsInput extends React.Component {

    handleChange = e => {
        const {uploadFile, input: {onChange}} = this.props;

        [].forEach.call(e.target.files, (file) => {
            console.log(file.name);
            this.uploadFile(file).then((res) => {
                onChange(this.props.input.value.concat({
                    location: res[0].Location,
                    name: file.name
                }));
            });
        });
    };

    handleRemoveFile = (fileIndex) => {
        const {input: {value, onChange}} = this.props;

        onChange(value.filter((file, index) => index !== fileIndex));
    };

    handleBlur = () => {
        const {input: {value, onBlur}} = this.props;

        onBlur(value);
    };

    uploadFile = file => {
        return new Promise((resolve, reject) => {
            this.props.uploadFile({file, resolve, reject});
        });
    };

    render() {
        const {input: {value}, onFocus} = this.props;

        const documentsRendered = value.map((file, index) =>
            <li key={index} onClick={() => this.handleRemoveFile(index)}>
                <div>{file.name}</div>
                <span className={styles.closeBtn}> + </span>
            </li>
        );

        return (
            <div className={styles.container}>
                <div className={styles.fileUploadBtn}>
                    <label>
                        <div className={styles.greyButton}>
                            <img src={FileBtn}/>UPLOAD FILES
                        </div>
                        <input
                            className={styles.hidden}
                            type="file"
                            onChange={this.handleChange}
                            onFocus={onFocus}
                            onBlur={this.handleBlur}
                            multiple
                        />
                    </label>
                </div>
                <ul className={styles.fileList}>
                    {documentsRendered}
                </ul>
            </div>
        )
    }
}

DocumentsInput.propTypes = {
    uploadFile: PropTypes.func.isRequired
};