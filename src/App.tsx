import "./App.css";
import { MapView } from "./components/MapView";
import { SearchBar } from "./components/Searchbar";
import { ShowFlag } from "./components/ShowFlag";
import { Weather } from "./components/Weather";

function App() {
  return (
    <div>
      <h1>weather app</h1>
      <SearchBar />
      <div className="w-3/4 mt-20">
        <MapView />
      </div>

      <div className="mt-20">
        <Weather />
      </div>
      <div>
        <ShowFlag />
      </div>
    </div>
  );
}

export default App;
