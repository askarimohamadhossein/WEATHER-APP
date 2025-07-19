/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { TGeocode } from "../types/geocede";
const OPENCAGE_KEY = "b353e067751a4f7d9f536c1c823d5ee3";

const getGeoCode = async (query: string): Promise<TGeocode[]> => {
  const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
    params: { key: OPENCAGE_KEY, q: query, limit: 5, no_annotations: 1 },
  });
  return res.data.results.map((item: any) => {
    return {
      id: item.geometry.lat + "," + item.geometry.lng,
      formatted: item.formatted,
      lat: item.geometry.lat,
      lon: item.geometry.lng,
      flag: item.components.country_code,
    };
  });
};
export const useGeuCode = (query: string) => {
  return useQuery({
    queryKey: ["geocode", query],
    queryFn: () => getGeoCode(query),
    enabled: !!query && query.length > 2,
  });
};
