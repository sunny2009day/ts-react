import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers  from './reducers';
import history from '../store/history';
import { routerMiddleware } from 'connected-react-router';

let store = createStore(reducers, applyMiddleware(routerMiddleware(history), promise, thunk, logger));
export default store;
