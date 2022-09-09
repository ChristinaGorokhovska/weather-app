import React, { useContext } from "react";
import { WeatherContext } from "./context/WeatherContext";
import CurrentShort from "./weather_display/CurrentShort";
import TodayWeather from "./weather_display/TodayWeather";
import WeekWeather from "./weather_display/WeekWeather";

export default function WeatherDisplay() {
  const { error } = useContext(WeatherContext);
  return (
    <div>
      <div className="weather-display">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="weather-render">
            <CurrentShort />
            <TodayWeather />
            <WeekWeather />
          </div>
        )}
      </div>
    </div>
  );
}
