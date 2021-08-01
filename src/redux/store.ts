import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import devicesReducer from 'components/device/devicesReducer';
import rootSaga from './saga/rootSaga';

const reducer = {
    devices: devicesReducer,
};

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
