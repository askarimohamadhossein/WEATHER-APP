import React from "react";
import { SearchBar } from "./components/SearchBar";
import { WeatherCard } from "./components/WeatherCard";
import { MapView } from "./components/MapView";
import { RecentCities } from "./components/RecentCities";
import { useWeatherContext } from "./context/WeatherContext";

const App: React.FC = () => {
  const { state } = useWeatherContext();
  return (
    <div className="min-h-screen p-4 flex flex-col gap-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Weather Explorer</h1>
      <SearchBar />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1 flex flex-col gap-4">
          <WeatherCard />
          <RecentCities />
        </div>
        <div className="md:col-span-2">{state.selected && <MapView />}</div>
      </div>
    </div>
  );
};

export default App;
