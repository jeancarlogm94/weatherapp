import React from 'react';
import { iconUrlFromCode } from '../services/weatherService';

function Forecast({ title, items }) {
  return (
    <div>
      <div className="flex items-center my-2 justify-center ">
        <p className="text-white font-medium text-2xl capitalize">{title}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-row my-3 items-center justify-between text-l text-white">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light">{item.title}</p>
            <img src={iconUrlFromCode(item.icon)} className="my-1" alt="" />
            <p className="font-medium text-xl">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
