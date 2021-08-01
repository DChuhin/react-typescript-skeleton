import { ApiEndpoint, HttpMethod } from 'api/http/httpInterfaces';

export interface ListDevicesParams {
  offset: number,
  limit: number,
}

export interface DeviceDto {
  id: number,
  name: String,
}

const listDevices: ApiEndpoint<ListDevicesParams, DeviceDto[]> = {
  httpRequestBuilder: (params) => ({
    url: '/devices',
    method: HttpMethod.GET,
    queryParams: {
      ...params
    },
  }),
};

/*interface CreateDeviceRequest {
  name: string,
}

const createDevice: HttpRequestBuilder<CreateDeviceRequest> = (params) => ({
  url: '/devices',
  method: HttpMethod.POST,
  body: params,
});

const getDevice: HttpRequestBuilder<number> = (deviceId) => ({
  url: '/devices/:deviceId',
  method: HttpMethod.GET,
  urlParams: {
    deviceId,
  },
});*/

const deviceApi = {
  list: listDevices,
/*  create: createDevice,
  get: getDevice,*/
};

export default deviceApi;