import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { middlewareCreator as entitiesMiddlewareCreator } from 'redux-ntities';
import createRootReducer from '../reducers';
import rootSaga from '../sagas';
import transforms from '../domain/transforms';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = applyMiddleware(
    entitiesMiddlewareCreator(transforms),
    sagaMiddleware,
    createLogger(),
)(createStore);

export default function configureStore(initialState: {}, AppNavigator: *): * {
    const store = createStoreWithMiddleware(createRootReducer(AppNavigator), initialState);

    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers'); // eslint-disable-line

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
