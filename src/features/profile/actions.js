import * as constants from './constants';

export const getUserInfoRequest = () => ({
    type: constants.GET_USER_INFO_REQUEST
});

export const getUserInfoSuccess = (userInfo) => ({
    type: constants.GET_USER_INFO_SUCCESS,
    userInfo
});

export const updateUserProfileRequest = (payload) => ({
    type: constants.UPDATE_USER_PROFILE_REQUEST,
    payload
});

export const getUserPlansRequest = () => ({
    type: constants.GET_USER_PLANS_REQUEST
});

export const getUserPlansSuccess = (userPlans) => ({
    type: constants.GET_USER_PLANS_SUCCESS,
    userPlans
});

export const sendContactFormRequest = (payload) => ({
    type: constants.SEND_CONTACT_FORM_REQUEST,
    payload
});

export const setContactFormMessage = (message) => ({
    type: constants.SET_CONTACT_FORM_MESSAGE,
    message
});

export const getUserPoliciesRequest = () => ({
    type: constants.GET_USER_PLANS_REQUEST
});
