import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useWeatherContext } from "../context/WeatherContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon2x from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: icon2x,
  shadowUrl: shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const MapView = () => {
  const { state } = useWeatherContext();
  if (!state.selected) return null;
  return (
    <div className="h-64 w-full rounded overflow-hidden">
      <MapContainer
        center={[state.selected.lat, state.selected.lon]}
        zoom={8}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[state.selected.lat, state.selected.lon]} />
      </MapContainer>
    </div>
  );
};
