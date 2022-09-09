import React, { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

export default function WeekWeather() {
  const [weekWeather, setWeekWeather] = useState();

  const { weather } = useContext(WeatherContext);

  useEffect(() => {
    const nextDayWeather = weather ? weather.data.forecast.forecastday.slice(1) : null;
    setWeekWeather(nextDayWeather);
  }, [weather]);

  return (
    <div>
      <div className="week-weather">
        {weekWeather ? (
          <div>
            {weekWeather.map((item, i) => {
              return (
                <div className="week-weather__item" key={i}>
                  <h3 className="day">
                    {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(item.date))}
                  </h3>
                  <div className="icon-weather">
                    <img src={item.day.condition.icon} alt="icon"></img>
                  </div>
                  <h3 className="max-temperature">
                    {item.day.maxtemp_c} <span>&#176;</span>
                  </h3>
                  <h3 className="min-temperature">
                    {item.day.mintemp_c} <span>&#176;</span>
                  </h3>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
