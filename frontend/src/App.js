import React from "react";
import NavBar from "./components/Nav/NavBar.jsx";
import Landing from "./components/Landing/Landing.jsx";
import EventForm from "./components/EventForm/EventForm.js";
import AuthLogin from "./util/AuthLogin.js";

function App() {
  return (
    <div className="App">
      <NavBar />
      <AuthLogin />
      <Landing />
      <EventForm />
    </div>
  );
}

export default App;
