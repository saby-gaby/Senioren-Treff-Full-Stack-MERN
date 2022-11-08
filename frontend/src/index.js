import React, {useContext} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SectionsProvider } from "./context/sectionsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SectionsProvider>
      <App />
    </SectionsProvider>
  </React.StrictMode>
);
