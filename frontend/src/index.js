import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SectionsProvider } from "./context/sectionsContext";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Router>
      <SectionsProvider>
        <App />
      </SectionsProvider>
    </Router>
  // </React.StrictMode>
);
