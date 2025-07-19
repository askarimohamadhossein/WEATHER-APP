import React, { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useGeocode } from '../hooks/useGeocode';
import { useWeatherContext } from '../context/WeatherContext';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 500);
  const { data } = useGeocode(debounced);
  const { selectLocation } = useWeatherContext();

  return (
    <div className="relative">
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {data && data.length > 0 && (
        <div className="absolute bg-white border mt-1 w-full max-h-40 overflow-auto z-10">
          {data.map((city) => (
            <button
              key={city.id}
              className="block text-left p-2 hover:bg-gray-100 w-full"
              onClick={() => selectLocation({ name: city.formatted, lat: city.lat, lon: city.lon })}
            >
              {city.formatted}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
