import { Action, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import devicesReducer from 'components/device/devicesReducer';
import rootSaga from './saga/rootSaga';
import * as Redux from 'redux';

const reducer = {
    devices: devicesReducer,
};

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    const ignoredActions = ['put your actions you dont want to log'];
    const logger: Redux.Middleware = createLogger({
        predicate: (getState: () => RootState, action: Action<string>) => !ignoredActions.includes(action.type),
    });
    middlewares.push(logger);
}
const store = configureStore({
    reducer,
    middleware: middlewares,
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export { store };
