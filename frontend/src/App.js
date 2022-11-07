import React from "react";
import NavBar from "./components/Nav/NavBar.jsx";
import Landing from "./components/Landing/Landing.jsx";
import UploadImage from "./components/UploadImage/UploadImage.js";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Landing />
      <UploadImage />
    </div>
  );
}

export default App;
