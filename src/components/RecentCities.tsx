import React from 'react';
import { useWeatherContext } from '../context/WeatherContext';

export const RecentCities: React.FC = () => {
  const { state, selectLocation } = useWeatherContext();
  return (
    <div className="flex gap-2 flex-wrap">
      {state.recent.map((r) => (
        <button key={r.name} onClick={() => selectLocation(r)} className="px-2 py-1 bg-gray-200 rounded">
          {r.name}
        </button>
      ))}
    </div>
  );
};
