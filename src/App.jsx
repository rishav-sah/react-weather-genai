import { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import { WeatherProvider } from "./utils/WeatherContext";
import Header from "./components/Header";
import Suggestion from "./components/Suggestion";

const App = () => {
  return (
    <div className="w-full p-4">
      <WeatherProvider>
        <Header />
        <div className="flex justify-evenly">
          <CurrentWeather />
          <Suggestion />
        </div>
      </WeatherProvider>
    </div>
  );
};

export default App;