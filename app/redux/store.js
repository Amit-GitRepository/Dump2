import createSagaMiddleware from 'redux-saga';
import middlewares from './middlewares/index.middleware';
import reduxPromise from 'redux-promise';
import rootReducer from './reducers/index.reducer';
import sagas from './sagas/index.saga';
import screenTracking from 'redux-ga-screen-tracker';
import {applyMiddleware, compose, createStore} from 'redux';
import {getScreenTrackingConfig} from '../utils/analytics.util';

const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, reduxPromise, screenTracking(getScreenTrackingConfig()), ...middlewares));

export default function getStore (initalState = {}) {
  const store = createStore(rootReducer, initalState, enhancer);
  if (module.hot) {
    // BREAKING change in : https://github.com/reactjs/react-redux/releases/tag/v2.0.0
    module.hot.accept(() => {
      store.replaceReducer(rootReducer);
    });
  }
  sagaMiddleware.run(sagas);
  return store;
}
