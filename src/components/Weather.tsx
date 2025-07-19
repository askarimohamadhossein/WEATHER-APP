import { useWeatherContext } from "../context/WeatherContext";
import { useWeather } from "../hooks/useWeather";

export const Weather = () => {
  const { state } = useWeatherContext();
  const { data, isLoading } = useWeather(
    state.selected?.lat,
    state.selected?.lon
  );
  if (isLoading) return <span>loading </span>;
  return <div>{data && data.temp} - C</div>;
};
