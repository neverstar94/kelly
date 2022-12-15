import { configureStore } from '@reduxjs/toolkit'
import rootSaga from 'core/middleware/index';
import rootReducers from 'core/redux/index';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from "redux-saga";

//create middleware
const sagaMiddleware = createSagaMiddleware();

//logger
const logger = createLogger();

const store = configureStore({
    reducer: rootReducers,
    middleware: [sagaMiddleware, logger],

});

sagaMiddleware.run(rootSaga);


export default store;