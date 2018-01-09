import * as constants from './constants';

export const getSurveyPageRequest = (pageId) => ({
    type: constants.GET_SURVEY_PAGE_REQUEST,
    pageId
});

export const getSurveyPageSuccess = ({
    currentPage,
    totalPages,
    questions,
    questionsOrder,
    nextPageId,
    previousPageId
}) => ({
    type: constants.GET_SURVEY_PAGE_SUCCESS,
    currentPage: Number(currentPage),
    totalPages: Number(totalPages),
    questions,
    questionsOrder,
    nextPageId,
    previousPageId,
});

export const submitSurveyPageRequest = (payload) => ({
    type: constants.SUBMIT_SURVEY_PAGE_REQUEST,
    payload
});

export const submitSurveyPageSuccess = () => ({
    type: constants.SUBMIT_SURVEY_PAGE_SUCCESS
});

export const cancelSurveyRequest = (payload) => ({
    type: constants.CANCEL_SURVEY_REQUEST,
    payload
});
