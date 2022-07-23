import React from 'react';
import { formatToLocalTime } from '../services/weatherService';

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center ">
        <p className="text-white text-center text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center">
        <p className="text-white text-4xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
