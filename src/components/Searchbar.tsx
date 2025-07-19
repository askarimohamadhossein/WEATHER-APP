import type React from "react";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useGeuCode } from "../hooks/useGeoCode";
import { useWeatherContext } from "../context/WeatherContext";

export const SearchBar: React.FC = () => {
  const [city, setCity] = useState("");
  const debounce = useDebounce(city, 500);
  const { data } = useGeuCode(debounce);
  const { selectLocation } = useWeatherContext();

  return (
    <div className="relative">
      <input
        className="border p-2 w-full rounded"
        placeholder="Search city..."
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      {data && data.length > 0 && (
        <div className="absolute bg-white border mt-1 w-full max-h-40 overflow-auto z-[1000]">
          {data.map((city) => {
            return (
              <button
                className="block text-left p-2 hover:bg-gray-100 w-full"
                key={city.id}
                onClick={() =>
                  selectLocation({
                    name: city.formatted,
                    lat: city.lat,
                    lon: city.lon,
                    countryCode: city.flag,
                  })
                }
              >
                {city.formatted}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
