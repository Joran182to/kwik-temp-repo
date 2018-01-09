import * as constants from './constants';

export const showMessage = (messageType, messageProps = {}) => ({
    type: constants.SHOW_MESSAGE,
    messageType,
    messageProps
});

export const hideMessage = () => ({
    type: constants.HIDE_MESSAGE
});