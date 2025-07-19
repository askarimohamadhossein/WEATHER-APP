import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const OPENCAGE_KEY = "b353e067751a4f7d9f536c1c823d5ee3";

const fetchGeocode = async (query: string) => {
  const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
    params: { key: OPENCAGE_KEY, q: query, limit: 5, no_annotations: 1 },
  });
  return res.data.results.map((r: any) => ({
    id: r.geometry.lat + "," + r.geometry.lng,
    formatted: r.formatted,
    lat: r.geometry.lat,
    lon: r.geometry.lng,
  }));
};

export const useGeocode = (query: string) => {
  return useQuery({
    queryKey: ["geocode", query],
    queryFn: () => fetchGeocode(query),
    enabled: !!query && query.length > 2,
  });
};
