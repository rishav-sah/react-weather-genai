import { createContext, useState } from "react";
import { currentWeatherData } from "./constant";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState({});

  return (
    <WeatherContext.Provider value={{ currentWeather, setCurrentWeather }}>
      { children }
    </WeatherContext.Provider>
  )
}



export default WeatherContext;