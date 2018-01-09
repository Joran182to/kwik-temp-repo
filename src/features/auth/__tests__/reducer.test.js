import reducer, {initialState} from '../reducer'
import * as constants from '../constants'

describe('Profile reducer', () => {

    it('should update state after successful sign in', () => {

        const user = {name: 'name_test', email: 'email_test'};
        const userSession = 'userSession_test';
        expect(
            reducer(initialState, {
                type: constants.SIGN_IN_SUCCESS,
                user,
                userSession
            })
        ).toEqual({
            ...initialState,
            isLoggedIn: true,
            user,
            userSession
        })
    });

    it('should update state on log in status checked', () => {

        expect(
            reducer(initialState, {
                type: constants.LOG_IN_STATE_CHECKED
            })
        ).toEqual({
            ...initialState,
            isLogInStateChecked: true
        })
    });

    it('should update state on logout', () => {

        expect(
            reducer(initialState, {
                type: constants.LOGOUT
            })
        ).toEqual({
            ...initialState,
            isLoggedIn: false,
            user: {},
            userSession: {}
        })
    });


    it('should return default state on unknown action', () => {

        expect(
            reducer(initialState, {
                type: 'fake action'
            })
        ).toEqual(initialState)
    });
});