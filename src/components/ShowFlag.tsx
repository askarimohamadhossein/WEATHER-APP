import type React from "react";

import { useWeatherContext } from "../context/WeatherContext";

export const ShowFlag: React.FC = () => {
  const { state } = useWeatherContext();

  return (
    <div className="relative">
      {state.selected?.countryCode && (
        <img
          src={`https://flagcdn.com/48x36/${state.selected.countryCode}.png`}
          alt="Country flag"
          className="w-8 h-6 rounded shadow"
        />
      )}
    </div>
  );
};
