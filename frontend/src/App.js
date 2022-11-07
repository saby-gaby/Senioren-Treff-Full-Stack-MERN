import React from "react";
import NavBar from "./components/Nav/NavBar.jsx";
import Landing from "./components/Landing/Landing.jsx";
import EventForm from "./components/EventForm/EventForm.js";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Landing />
      <EventForm />
    </div>
  );
}

export default App;
