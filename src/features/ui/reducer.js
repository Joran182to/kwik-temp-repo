import * as constants from './constants';

const initialState = {
    isMessageVisible: false,
    messageType: null,
    messageProps: {}
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case constants.SHOW_MESSAGE:
            return Object.assign({}, state, {
                isMessageVisible: true,
                messageType: action.messageType,
                messageProps: action.messageProps
            });

        case constants.HIDE_MESSAGE:
            return Object.assign({}, state, {
                isMessageVisible: false,
                messageType: null,
                messageProps: {}
            });

        default:
            return state;

    }
};

export default reducer;