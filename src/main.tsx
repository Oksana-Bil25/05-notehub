// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Переконайтеся, що імпортується саме компонент App
import App from "./components/App/App";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> не вимагає пропсів, якщо App.tsx не визначив їх */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
