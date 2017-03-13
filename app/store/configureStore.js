import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../reducers'

const middleware = applyMiddleware(thunk );//, logger() );

//Including Redux DevTools
export default function configureStore() {

    const store = createStore(
        reducer,
        compose(
            middleware,
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    return store;
}
