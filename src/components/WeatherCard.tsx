import React from 'react';
import { useWeatherContext } from '../context/WeatherContext';
import { useWeather } from '../hooks/useWeather';

export const WeatherCard: React.FC = () => {
  const { state } = useWeatherContext();
  const { data, isLoading } = useWeather(state.selected?.lat, state.selected?.lon);

  if (!state.selected) return null;
  if (isLoading) return <p>Loading weather...</p>;

  return data ? (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg">{data.name}</h2>
      <p>{Math.round(data.temp)}°C - {data.description}</p>
      {data.icon && <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="" />}
    </div>
  ) : <p>No weather data</p>;
};
