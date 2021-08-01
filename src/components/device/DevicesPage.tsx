import React, { useEffect } from 'react';
import Device from 'components/device/Device';
import { connect } from 'react-redux';
import { RootState } from 'redux/store';
import { DeviceDto } from 'api/deviceApi';
import { fetchDevicesList } from './deviceActions';

interface DevicesPageProps {
  devices: DeviceDto[],
  fetchDevicesList: typeof fetchDevicesList,
}

const DevicesPage = ({ devices, fetchDevicesList }: DevicesPageProps) => {
  useEffect(() => {
    if (!devices.length) {
      fetchDevicesList({ offset: 0, limit: 10 });
    }
  }, [devices, fetchDevicesList]);
  return (
    <div className="devices-container">
      {devices.map(device => (
        <Device id={device.id} name={device.name} />
      ))}
    </div>
  )
}

export default connect(
  (store: RootState) => store.devices.devices,
  { fetchDevicesList }
)(DevicesPage);