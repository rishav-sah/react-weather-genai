import axios from "axios";
import { apiKey } from "./constant";

const api = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

const WeatherAPI = {

  getCurrentWeather: (location) => {
    const params = {
      key: apiKey,
      q: location,
      aqi: "yes"
    }
    return api.get("/current.json", {params});
  }

}

export default WeatherAPI;