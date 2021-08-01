import { ApiEndpoint, HttpMethod } from 'api/http/httpInterfaces';

interface ListDeviceEventsRequest {
  deviceId?: number;
}

interface EventDto {
  id: number;
  deviceId: number;
  message: string;
}

const listDeviceEvents: ApiEndpoint<ListDeviceEventsRequest, EventDto[]> = {
  httpRequestBuilder: ({ deviceId }) => ({
    url: '/events',
    method: HttpMethod.GET,
    queryParams: deviceId ? {
      deviceId,
    } : undefined,
  }),
};

const eventApi = {
  list: listDeviceEvents,
};

export default eventApi;
