import * as constants from './constants';

export const getClaims = () => ({
    type: constants.GET_CLAIMS_REQUEST
});

export const createClaim = claim => ({
    type: constants.CREATE_CLAIM_REQUEST,
    claim
});

export const getClaimsSuccess = claims => ({
    type: constants.GET_CLAIMS_SUCCESS,
    claims
});

export const uploadFile = payload => ({
    type: constants.UPLOAD_FILE_REQUEST,
    payload
});

export const uploadFileSuccess = () => ({
    type: constants.UPLOAD_FILE_SUCCESS
});