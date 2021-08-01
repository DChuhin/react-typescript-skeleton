export type RequestParams = { [key: string]: string | boolean | number };

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface HttpRequest {
  url: string,
  method: HttpMethod,
  urlParams?: RequestParams,
  queryParams?: RequestParams,
  headers?: HeadersInit,
  body?: object,
}

// ResponseBody is used to mark contract so action creator can pick type and reducer can read it to be type-safe
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ApiEndpoint<RequestParams, ResponseBody> {
  httpRequestBuilder: (request: RequestParams) => HttpRequest,
}
