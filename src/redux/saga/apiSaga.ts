import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiAction, isApiRequest } from 'redux/createApiAction';
import { doRequest } from 'api/http/httpRequestUtils';

export function* doApiRequest(action: ApiAction) {
  const { request, pending, success, failure } = action.payload;
  try {
    yield put(pending());
    const response: Response = yield call(doRequest, request);
    const responseJson: object = yield call([response, 'json']);
    if (response.ok) {
      yield put(success(responseJson));
    } else {
      yield put(failure(responseJson));
    }
  } catch (e) {
    const error: Error = e;
    yield put(failure(error.message));
  }
}

function* apiSaga() {
  yield takeEvery(isApiRequest, doApiRequest);
}

export default apiSaga;