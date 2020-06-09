import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/index';
import rootSaga from './sagas/index';

const saga = createSagaMiddleware();
const store = createStore(reducer, {}, applyMiddleware(saga));

saga.run(rootSaga);

export default store;