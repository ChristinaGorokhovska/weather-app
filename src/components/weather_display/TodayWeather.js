import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { WeatherContext } from "../context/WeatherContext";

export default function TodayWeather() {
  const [currentHour, setCurrentHour] = useState();
  const [todayWeather, setTodayWeather] = useState();

  const { weather } = useContext(WeatherContext);

  useEffect(() => {
    const localTime = weather ? weather.data.location.localtime : null;
    const str = localTime ? / (\d+):/.exec(localTime)[1] : null;

    setCurrentHour(str);
  }, [weather]);

  useEffect(() => {
    const weatherByHours = [];
    if (weather) {
      const forecastday = weather.data.forecast.forecastday[0].hour;
      for (let i = currentHour; i < forecastday.length; i++) {
        weatherByHours.push({ hour: i, icon: forecastday[i].condition.icon, temperature: forecastday[i].temp_c });
      }
    }

    setTodayWeather(weatherByHours);
  }, [currentHour]);

  return (
    <div>
      <div className="today-by-hours">
        {todayWeather ? (
          <Swiper
            className="today-by-hours__swiper"
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={todayWeather.length < 5 ? todayWeather.length : 5}
            navigation
            pagination={{ clickable: true }}
          >
            {todayWeather.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="today-hour-weather">
                    <h3 className="time">{/^\d$/.test(item.hour) ? "0" + item.hour : item.hour}</h3>
                    <img src={item.icon} alt="icon"></img>
                    <h3 className="temperature">
                      {item.temperature}
                      <span>&#176;</span>
                    </h3>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
