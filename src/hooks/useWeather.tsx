import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OPENWEATHER_KEY = "b58cf46ce996efb79625095bc96defee";

const fetchWeather = async (lat: number, lon: number) => {
  const res = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_KEY,
        units: "metric",
      },
    }
  );
  return {
    name: res.data.name,
    temp: res.data.main.temp,
    description: res.data.weather[0].description,
    icon: res.data.weather[0].icon,
    lat: res.data.coord.lat,
    lon: res.data.coord.lon,
  };
};

export const useWeather = (lat?: number, lon?: number) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => fetchWeather(lat!, lon!),
    enabled: lat !== undefined && lon !== undefined,
  });
};
