import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "jotai";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@/css/main.scss";

const container = document.getElementById("app");
const entry = createRoot(container);

entry.render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
