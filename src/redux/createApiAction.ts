import { Action, createAction } from '@reduxjs/toolkit';
import { ApiEndpoint, HttpRequest } from 'api/http/httpInterfaces';

const API_ACTION = 'API_ACTION';
const PENDING_SUFFIX = '_PENDING';
const SUCCESS_SUFFIX = '_SUCCESS';
const FAILURE_SUFFIX = '_FAILURE';

export interface ApiAction {
  type: typeof API_ACTION,
  payload: {
    request: HttpRequest,
    // TODO try to type after test
    pending: () => any,
    success: (response: any) => any,
    failure: (error: any) => any,
  },
}

interface ApiActionCreator<ActionParams, Pending, Success> {
  pending: Pending,
  success: Success,
  // TODO Using 'any' is forbidden! Fix by providing generic error response
  failure: any,

  (params: ActionParams): ApiAction,
}

export const baseApiActionCreator = createAction(API_ACTION, ({ payload, meta }) => ({ payload, meta }));
export const isApiRequest = (action: Action) => action.type === API_ACTION;

const buildPayloadActionCreators = <ActionParams, ResponseBody, Meta = null>(type: string) => ({
  pending: createAction(`${type}${PENDING_SUFFIX}`, (params: ActionParams, meta: Meta) => ({
    payload: params,
    meta,
  })),
  success: createAction(`${type}${SUCCESS_SUFFIX}`, (response: ResponseBody, meta: Meta) => ({
    payload: response,
    meta,
  })),
  // TODO fix by providing generic error response
  failure: createAction(`${type}${FAILURE_SUFFIX}`, (error: any, meta: Meta) => ({
    payload: error,
    meta,
  })),
});

export const createApiActionWithMeta = <ActionParams, ResponseBody, Meta = null>(
  type: string,
  apiEndpoint: ApiEndpoint<ActionParams, ResponseBody>,
  metaCreator: (params: ActionParams) => Meta,
) => {
  const creators = buildPayloadActionCreators<ActionParams, ResponseBody, Meta>(type);
  const baseActionCreator = (params: ActionParams): ApiAction => {
    const meta = metaCreator(params);
    return baseApiActionCreator({
      payload: {
        request: apiEndpoint.httpRequestBuilder(params),
        pending: () => creators.pending(params, meta),
        success: (response: ResponseBody) => creators.success(response, meta),
        failure: (error: any) => creators.failure(error, meta),
      },
      meta,
    });
  };

  const casted = baseActionCreator as ApiActionCreator<ActionParams, typeof creators.pending, typeof creators.success>;
  return Object.assign(casted, creators);
};

export const createApiAction = <ActionParams, ResponseBody>(
  type: string,
  apiEndpoint: ApiEndpoint<ActionParams, ResponseBody>,
) => {
  const metaCreatorStub = () => null;
  return createApiActionWithMeta(type, apiEndpoint, metaCreatorStub);
};
