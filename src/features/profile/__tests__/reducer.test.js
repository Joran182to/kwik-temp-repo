import reducer, {initialState} from '../reducer'
import * as constants from '../constants'

describe('Profile reducer', () => {

    it('should update state on receiving of user info', () => {

        const userInfo = {a: 'a_test', b: 'b_test'};
        expect(
            reducer(initialState, {
                type: constants.GET_USER_INFO_SUCCESS,
                userInfo
            })
        ).toEqual({
            ...initialState,
            userInfo
        })
    });

    it('should update state on receiving of user\'s plans', () => {

        const plans = [{id: 1, name: 'plan_test'}];
        expect(
            reducer(initialState, {
                type: constants.GET_USER_PLANS_SUCCESS,
                userPlans: plans
            })
        ).toEqual({
            ...initialState,
            plans
        })
    });

    it('should update state on setting contact form message', () => {

        const message = 'test_message';
        expect(
            reducer(initialState, {
                type: constants.SET_CONTACT_FORM_MESSAGE,
                message
            })
        ).toEqual({
            ...initialState,
            contactFormMessage: message
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