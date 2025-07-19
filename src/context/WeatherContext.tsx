/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  useReducer,
  type PropsWithChildren,
} from "react";
import type {
  SelectedLocation,
  WeatherAction,
  WeatherState,
} from "../types/geocede";

const initalState: any = {
  selected: null,
  weather: null,
  recent: [],
  loadingWeather: false,
};

function reducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case "SET_SELECTED":
      return { ...state, selected: action.payload };
    case "SET_WEATHER":
      return { ...state, weather: action.payload };
    case "SET_LOADING":
      return { ...state, loadingWeather: action.payload };
    case "ADD_RECENT":
      return {
        ...state,
        recent: [action.payload, ...state.recent].slice(0, 5),
      };
    default:
      return state;
  }
}

interface ContextType {
  state: WeatherState;
  dispatch: React.Dispatch<any>;
  selectLocation: (loc: SelectedLocation) => void;
}
const WeatherContext = createContext<ContextType | undefined>(undefined);

export const WeatherContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  const selectLocation = (loc: SelectedLocation) => {
    dispatch({ type: "SET_SELECTED", payload: loc });
    localStorage.setItem("lastLocation", JSON.stringify(loc));
  };
  return (
    <WeatherContext.Provider value={{ state, dispatch, selectLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const ctx = useContext(WeatherContext);
  if (!ctx)
    throw new Error("useWeatherContext must be used within WeatherProvider");
  return ctx;
};
