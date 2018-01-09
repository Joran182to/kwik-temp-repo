import * as actions from '../actions'
import * as constants from '../constants'

describe('Profile actions', () => {

    it('should have an action to request user info', () => {

        const expectedAction = {
            type: constants.GET_USER_INFO_REQUEST
        };

        expect(actions.getUserInfoRequest()).toEqual(expectedAction);
    });

    it('should have an action with user info after receiving it', () => {

        const expectedAction = {
            type: constants.GET_USER_INFO_SUCCESS,
            userInfo: 'test'
        };

        expect(actions.getUserInfoSuccess('test')).toEqual(expectedAction);
    });

    it('should have an action to request an update of user profile', () => {

        const expectedAction = {
            type: constants.UPDATE_USER_PROFILE_REQUEST,
            payload: 'test'
        };

        expect(actions.updateUserProfileRequest('test')).toEqual(expectedAction);
    });

    it('should have an action to request user\'s plans', () => {

        const expectedAction = {
            type: constants.GET_USER_PLANS_REQUEST,
        };

        expect(actions.getUserPlansRequest()).toEqual(expectedAction);
    });

    it('should have an action with user\'s plans after receiving it', () => {

        const expectedAction = {
            type: constants.GET_USER_PLANS_SUCCESS,
            userPlans: 'test'
        };

        expect(actions.getUserPlansSuccess('test')).toEqual(expectedAction);
    });

    it('should have an action to request sending of contact form', () => {

        const expectedAction = {
            type: constants.SEND_CONTACT_FORM_REQUEST,
            payload: 'test'
        };

        expect(actions.sendContactFormRequest('test')).toEqual(expectedAction);
    });

    it('should have an action to set message for contact form', () => {

        const expectedAction = {
            type: constants.SET_CONTACT_FORM_MESSAGE,
            message: 'test'
        };

        expect(actions.setContactFormMessage('test')).toEqual(expectedAction);
    });

});