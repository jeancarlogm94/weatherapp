import React from "react";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div>

      <div className="flex items-center justify-center mt-2 text-2xl text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-center text-white">
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
      </div>
      
      <div className="flex flex-row items-center justify-center my-1 space-x-2 text-white text-md">
        <UilSun />
        <p className="text-center font-light">
          Rise {" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mma")}
          </span>
        </p>
        <p className="text-center font-light">|</p>

        <UilSunset />
        <p className="text-center font-light">
          Set {" "}
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mma")}
          </span>
        </p>
        <p className="text-center font-light"></p>
      </div>

      <div className="flex flex-row items-center justify-center my-4 space-x-2 text-white text-md">
        <UilSun />
        <p className="text-center font-light">
          High {" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="text-center font-light">|</p>

        <UilSun />
        <p className="text-center font-light">
          Low {" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-md">
      <UilTemperature size={18} className="mr-1" />
            Real fell:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>    
      <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>     
      </div>

      <div className="flex flex-row items-center justify-center mb-2 space-x-2 text-white text-md">
         
      </div>

      <div className="flex flex-row items-center justify-center mb-2 space-x-2 text-white text-md">
      <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>      
      </div>
    </div>
  );
}

export default TemperatureAndDetails;