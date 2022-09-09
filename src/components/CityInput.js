import React, { useContext } from "react";
import { WeatherContext } from "./context/WeatherContext";

function CityInput() {
  const { location } = useContext(WeatherContext);
  const { setLocation } = useContext(WeatherContext);
  const { handleSearch } = useContext(WeatherContext);
  return (
    <div className="input-city">
      <div className="input-city__block">
        <input
          type="text"
          placeholder="Enter location"
          onChange={(e) => {
            setLocation(e.target.value.trim());
          }}
        ></input>
        <button onClick={handleSearch} disabled={!location}>
          Search
        </button>
      </div>
    </div>
  );
}

export default CityInput;
