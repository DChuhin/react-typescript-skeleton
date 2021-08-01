import { createApiAction } from 'redux/createApiAction';
import API from 'api/API';

export const fetchDevicesList = createApiAction('fetch_device_list', API.device.list);