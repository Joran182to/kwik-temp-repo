import * as constants from './constants';

export const initialState = {
    userInfo: {},
    plans: [],
    contactFormMessage: ''
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case constants.GET_USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                userInfo: action.userInfo
            });

        case constants.GET_USER_PLANS_SUCCESS:
            return Object.assign({}, state, {
                plans: action.userPlans
            });

        case constants.SET_CONTACT_FORM_MESSAGE:
            return Object.assign({}, state, {
                contactFormMessage: action.message
            });

        default:
            return state;

    }
};

export default reducer;