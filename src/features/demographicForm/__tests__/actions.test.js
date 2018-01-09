import * as actions from '../actions'
import * as constants from '../constants'

describe('demographic actions', () => {

    it('should have an action to send demo data', () => {

        const expectedAction = {
            type: constants.SEND_DEMOGRAPHIC_FORM_REQUEST
        };

        expect(actions.sendDemographicFormRequest()).toEqual(expectedAction);
    });
});