import { HttpMethod, HttpRequest } from 'api/http/httpInterfaces';
import urlAssembler from 'url-assembler';
import Cookies from 'universal-cookie';

const API_PREFIX = '/api';

const cookies = new Cookies();
const csrfProtectedMethods = [HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH];
const getDefaultHeaders = (method: HttpMethod) => {
  const headers: HeadersInit = {
    'content-type': 'application/json',
  };
  if (csrfProtectedMethods.includes(method)) {
    headers['X-XSRF-TOKEN'] = cookies.get('XSRF-TOKEN');
  }
  return headers;
};

export const doRequest = ({ url, urlParams, queryParams, body, method, headers }: HttpRequest) => {
  const resultUrl = urlAssembler()
    .template(`${API_PREFIX}${url}`)
    .param(urlParams || {})
    .query(queryParams || {})
    .toString();
  const options = {
    method,
    body: JSON.stringify(body),
    headers: {
      ...getDefaultHeaders(method),
      ...(headers || {}),
    },
  };
  return fetch(resultUrl, options);
};