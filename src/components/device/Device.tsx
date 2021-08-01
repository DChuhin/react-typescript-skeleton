import React from 'react';
import { DeviceDto } from 'api/deviceApi';

const Device = ({ id, name }: DeviceDto) => (
  <div>
    <span>{`Device id: ${id}`}</span>
    <span>{`Device name: ${name}`}</span>
  </div>
);

export default Device;