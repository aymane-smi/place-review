import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './index';

export const Store = createStore(reducers,
    compose(applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        ));