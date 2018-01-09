import * as constants from './constants';

const initialState = {
    currentPage: 0,
    totalPages: 0,
    questions: [],
    questionsOrder: [],
    isFetching: false,
    isSurveyFinished: false
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case constants.GET_SURVEY_PAGE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case constants.GET_SURVEY_PAGE_SUCCESS:
            return Object.assign({}, state, {
                currentPage: action.currentPage,
                totalPages: action.totalPages,
                questions: action.questions,
                questionsOrder: action.questionsOrder,
                nextPageId: action.nextPageId,
                previousPageId: action.previousPageId,
                isFetching: false,
            });

        case constants.SUBMIT_SURVEY_PAGE_SUCCESS:
            return Object.assign({}, state, {
                isSurveyFinished: state.currentPage >= state.totalPages
            });

        default:
            return state;

    }
};

export default reducer;
