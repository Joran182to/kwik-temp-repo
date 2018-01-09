import * as constants from './constants';

export const saveProfileRequest = (profile) => ({
    type: constants.SAVE_PROFILE_REQUEST,
    profile
});