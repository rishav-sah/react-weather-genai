import { useContext, useEffect, useState } from "react";
import WeatherAPI from "../utils/api";
import WeatherContext from "../utils/WeatherContext";
import useCurrentLocation from "../utils/useCurrentLocation";

const Header = () => {

  const { latitude, longitude } = useCurrentLocation();

  const [searchText, setSearchText] = useState("");
  const [readyToFetch, setReadyToFetch] = useState(false);

  const { currentWeather, setCurrentWeather } = useContext(WeatherContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    fetchWeather();
  };

  useEffect(() => {
    if (latitude && longitude) {
      setSearchText(`${latitude}, ${longitude}`);
      setReadyToFetch(true);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (readyToFetch) {
      fetchWeather();
      setReadyToFetch(false);
    }
  }, [readyToFetch]);

  async function fetchWeather() {
    try {
      const response = await WeatherAPI.getCurrentWeather(searchText);
      console.log(response)
      setCurrentWeather(response.data)
    } catch (error) {
      console.error("Failed to fetch weather data:", error)
    }
  }

  return (
    <div className="m-4 w-full">
      <h1>Weather Dashboard Assignment</h1>
      <form onSubmit={handleSubmit}>
        <div className="relative m-auto max-w-3xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="search city"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Header;
