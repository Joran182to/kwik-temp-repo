import * as actions from '../actions'
import * as constants from '../constants'

describe('Auth actions', () => {

    it('should have an action to request sign up', () => {

        const expectedAction = {
            type: constants.SIGN_UP_REQUEST,
            payload: 'test'
        };

        expect(actions.signUpRequest('test')).toEqual(expectedAction);
    });

    it('should have an action to request sign in', () => {

        const expectedAction = {
            type: constants.SIGN_IN_REQUEST,
            payload: 'test'
        };

        expect(actions.signInRequest('test')).toEqual(expectedAction);
    });

    it('should have an action for successful sign in', () => {

        const expectedAction = {
            type: constants.SIGN_IN_SUCCESS,
            user: 'test_user',
            userSession: 'test_userSession'
        };

        expect(actions.signInSuccess('test_user', 'test_userSession')).toEqual(expectedAction);
    });

    it('should have an action to check state of log in', () => {

        const expectedAction = {
            type: constants.CHECK_LOG_IN_STATE
        };

        expect(actions.checkLogInState()).toEqual(expectedAction);
    });

    it('should have an action to dispatch when log in state checked', () => {

        const expectedAction = {
            type: constants.LOG_IN_STATE_CHECKED
        };

        expect(actions.logInStateChecked()).toEqual(expectedAction);
    });

    it('should have an action to logout', () => {

        const expectedAction = {
            type: constants.LOGOUT
        };

        expect(actions.logout()).toEqual(expectedAction);
    });
});