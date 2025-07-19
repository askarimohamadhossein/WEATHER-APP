import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherContextProvider } from "./context/WeatherContext.tsx";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
