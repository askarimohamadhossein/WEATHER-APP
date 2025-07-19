import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherProvider } from "./context/WeatherContext";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
