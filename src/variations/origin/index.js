import { fork } from 'redux-saga/effects'
import root from '../../root';
import Routes from './Routes';
import authReducer from '../../features/auth/reducer';
import uiReducer from '../../features/ui/reducer';
import surveyReducer from '../../features/survey/reducer';
import quotesReducer from '../../features/quotes/reducer';
import paymentReducer from '../../features/payment/reducer';
import profileReducer from '../../features/profile/reducer';
import claimReducer from '../../features/claim/reducer';
import authSagas from '../../features/auth/sagas';
import demographicFormSagas from '../../features/demographicForm/sagas';
import surveySagas from '../../features/survey/sagas';
import quotesSaga from '../../features/quotes/sagas';
import paymentSagas from '../../features/payment/sagas';
import profileSagas from '../../features/profile/sagas';
import claimSagas from '../../features/claim/sagas';
import { reducer as formReducer } from 'redux-form';
import createStore from '../../store';

const reducers = {
    auth: authReducer,
    ui: uiReducer,
    survey: surveyReducer,
    quotes: quotesReducer,
    form: formReducer,
    payment: paymentReducer,
    profile: profileReducer,
    claim: claimReducer
};

const sagas = [fork(authSagas), fork(demographicFormSagas), fork(surveySagas), fork(quotesSaga), fork(paymentSagas),
    fork(profileSagas), fork(claimSagas)];

const Store = createStore(reducers, sagas);

root(Routes, Store);
