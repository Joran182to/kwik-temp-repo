import * as constants from './constants';

const initialState = {
    claims: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case constants.GET_CLAIMS_SUCCESS:
            return Object.assign({}, state, {
                claims: action.claims
            });

        default:
            return state;

    }
};

export default reducer;