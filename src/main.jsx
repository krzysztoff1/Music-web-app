import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "jotai";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@/css/main.scss";
import { QueryClientProvider, QueryClient } from "react-query";

const container = document.getElementById("app");
const entry = createRoot(container);
const queryClient = new QueryClient();

entry.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
