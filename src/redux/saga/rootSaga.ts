import { fork } from 'redux-saga/effects';
import apiSaga from 'redux/saga/apiSaga';

function* rootSaga() {
  yield fork(apiSaga);
}

export default rootSaga;