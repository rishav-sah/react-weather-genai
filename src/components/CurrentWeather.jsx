import { useContext } from "react";
import { WeatherContext } from "../utils/WeatherContext";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

const CurrentWeather = () => {
  const { currentWeather } = useContext(WeatherContext);
  const { location, current } = currentWeather;
  console.log(location, current);

  dayjs.extend(LocalizedFormat);
  const date = dayjs(location?.localtime);

  return !location && !current ? (
    <h1>Loading...</h1>
  ) : (
    <div className="mt-10 w-96 min-h-80 rounded-lg overflow-hidden shadow-lg bg-slate-200">
      <div className="py-4 px-2 flex justify-between bg-slate-300 text-lg">
        <span>{date.format("dddd")}</span>
        <span>{date.format("LT")}</span>
      </div>
      <div className="p-2 flex justify-between items-center">
        <div>
          <span className="text-4xl">{current?.temp_c}&deg;</span>
          <div className="mt-4">
            <p className="text-xs font-bold">{location?.name}</p>
            <p className="text-xs font-bold">{location?.region}</p>
            <p className="text-xs font-bold">{location?.country}</p>
          </div>
        </div>
        <span className="max-w-20">
          <img className="w-full" src={current?.condition.icon}></img>
          <p className="text-xs font-bold">{current?.condition?.text}</p>
        </span>
      </div>
      <div className="mt-4 px-2">
        <ul>
          <li>
            <span className="mr-2 font-light text-gray-600">Real Feel</span>
            {current?.feelslike_c}&deg;
          </li>
          <li>
            <span className="mr-2 font-light text-gray-600">Wind</span>
            {current?.wind_kph} km/h
          </li>
          <li>
            <span className="mr-2 font-light text-gray-600">Pressure</span>
            {current?.wind_kph}MB
          </li>
          <li>
            <span className="mr-2 font-light text-gray-600">Humidity</span>
            {current?.humidity}%
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CurrentWeather;
