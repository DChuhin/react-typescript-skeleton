import { createReducer } from '@reduxjs/toolkit';
import { fetchDevicesList } from 'components/device/deviceActions';
import { DeviceDto } from 'api/deviceApi';

interface DevicesState {
  loading: boolean,
  devices: DeviceDto[],
}

const defaultState: DevicesState = {
  loading: false,
  devices: [],
}

const fetchDevicesListPending = (state: DevicesState) => {
  return { ...state, loading: true };
}

const fetchDevicesListSuccess = (state: DevicesState, action: ReturnType<typeof fetchDevicesList.success>) => {
  return { loading: false, devices: action.payload };
}

const devicesReducer = createReducer(defaultState,
  builder => builder
    .addCase(fetchDevicesList.pending, fetchDevicesListPending)
    .addCase(fetchDevicesList.success, fetchDevicesListSuccess)
)

export default devicesReducer;