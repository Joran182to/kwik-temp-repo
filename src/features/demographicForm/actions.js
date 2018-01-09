import * as constants from './constants';

export const sendDemographicFormRequest = (payload) => ({
    type: constants.SEND_DEMOGRAPHIC_FORM_REQUEST,
    payload
});