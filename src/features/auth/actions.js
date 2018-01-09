import * as constants from './constants';

export const signUpRequest = (payload) => ({
    type: constants.SIGN_UP_REQUEST,
    payload
});

export const signInRequest = (payload) => ({
    type: constants.SIGN_IN_REQUEST,
    payload
});

export const signInSuccess = (user, userSession) => ({
    type: constants.SIGN_IN_SUCCESS,
    user,
    userSession
});

export const checkLogInState = () => ({
    type: constants.CHECK_LOG_IN_STATE
});

export const logInStateChecked = () => ({
    type: constants.LOG_IN_STATE_CHECKED
});

export const logout = () => ({
    type: constants.LOGOUT
});