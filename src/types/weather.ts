export interface WeatherData {
  name: string;
  temp: number;
  description: string;
  icon: string;
  lat: number;
  lon: number;
}

export interface SelectedLocation {
  name: string;
  lat: number;
  lon: number;
}

export interface WeatherState {
  selected: SelectedLocation | null;
  weather: WeatherData | null;
  recent: SelectedLocation[];
  loadingWeather: boolean;
}

export type WeatherAction =
  | { type: 'SET_SELECTED'; payload: SelectedLocation | null }
  | { type: 'SET_WEATHER'; payload: WeatherData | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_RECENT'; payload: SelectedLocation };
