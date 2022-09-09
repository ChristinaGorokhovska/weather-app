import React, { useState } from "react";
import Axios from "axios";
import CityInput from "./components/CityInput";
import WeatherDisplay from "./components/WeatherDisplay";
import "./css/style.min.css";
import { WeatherContext } from "./components/context/WeatherContext";
import { KEY, HOST, NUMBER_OF_DAYS } from "./config/config";

function App() {
  const [location, setLocation] = useState();
  const [weather, setWeather] = useState("");
  const [error, setError] = useState();

  async function handleSearch() {
    setError(null);

    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
      params: { q: location, days: NUMBER_OF_DAYS },
      headers: {
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": HOST,
      },
    };

    try {
      const response = await Axios.request(options);
      setWeather(response);
    } catch (e) {
      if (e.response.data.error.code === 1006) {
        setError(e.response.data.error.message);
      } else {
        setError("Oops... something went wrong.");
      }

      setWeather(null);
    }
  }

  return (
    <WeatherContext.Provider value={{ location, setLocation, handleSearch, weather, error }}>
      <div className="container">
        <CityInput />
        <WeatherDisplay />
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
