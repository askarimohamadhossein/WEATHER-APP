/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer, useContext } from "react";

const initialState: any = {
  selected: null,
  weather: null,
  recent: [],
  loadingWeather: false,
};

function reducer(state: WeatherState, action: any): WeatherState {
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
  state: any;
  dispatch: React.Dispatch<any>;
  selectLocation: (loc: any) => void;
}

const WeatherContext = createContext<ContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectLocation = (loc: any) => {
    dispatch({ type: "SET_SELECTED", payload: loc });
    dispatch({ type: "ADD_RECENT", payload: loc });
    localStorage.setItem("lastLocation", JSON.stringify(loc));
  };

  return (
    <WeatherContext.Provider value={{ state, dispatch, selectLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWeatherContext = () => {
  const ctx = useContext(WeatherContext);
  if (!ctx)
    throw new Error("useWeatherContext must be used within WeatherProvider");
  return ctx;
};
