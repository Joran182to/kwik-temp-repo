import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
const sagaMiddleware = createSagaMiddleware();

export default function (reducersObj, sagasArray) {
    let initialState = {};

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const Store = createStore(
        combineReducers(reducersObj),
        initialState,
        composeEnhancers(
            applyMiddleware(sagaMiddleware)
        )
    );

    function* sagas() {
        yield all(sagasArray);
    }
    sagaMiddleware.run(sagas).done.catch(error => {
        throw error;
    });

    return Store;
};

