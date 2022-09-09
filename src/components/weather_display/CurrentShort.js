import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function CurrentShort() {
  const { weather } = useContext(WeatherContext);
  return (
    <div>
      {weather ? (
        <div className="current">
          <h2 className="current__location-title">{weather.data.location.name}</h2>

          <h3 className="current__location-description">{weather.data.current.condition.text}</h3>
          <img src={weather.data.current.condition.icon}></img>
          <p className="current__temperature">
            {weather.data.current.temp_c}
            <span>&#176;</span>
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
