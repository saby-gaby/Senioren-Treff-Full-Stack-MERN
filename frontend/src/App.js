import "./App.css";
import React, { useContext, useEffect } from "react";
import { SectionsContext } from "./context/sectionsContext.js";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Home from "./routes/Home/Home.jsx";
import LoginForm from "./routes/LoginForm/LoginForm";
import RegisterForm from "./routes/RegisterForm/RegisterForm";
import EventForm from "./routes/EventForm/EventForm";
import OneEvent from "./routes/OneEvent/OneEvent";
import SearchedEvents from "./routes/SearchedEvents/SearchedEvents";
import UserProfile from "./routes/UserProfile/UserProfile";
import Page404 from "./routes/Page404/Page404";

function App() {
  const { isAuth } = useContext(SectionsContext);

  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">
                <img src="logo.svg" />
              </NavLink>
            </li>
            {location.pathname !== "/login" && (
              <li>
                {isAuth && location.pathname === "/profile" && <span className="text">Mein Bereich</span>}
                {location.pathname==="/register" && <span className="text">Register</span>}
                {(isAuth && location.pathname !== "/profile" && location.pathname !=="/register") && <NavLink to="/profile" className="navBtn">Mein Bereich</NavLink>}
                {!isAuth && <NavLink to="/login" className="navBtn">Anmelden / Registrieren</NavLink>}
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className="workNav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/event-form">Event-Form</NavLink>
        <NavLink to="/event">1 Event</NavLink>
        <NavLink to="/events">Events</NavLink>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/event-form" element={<EventForm />} />
          {/* <Route path="/event" element={<OneEvent />} /> */}
          <Route path="/event/:id" element={<OneEvent />} />
          <Route path="/events" element={<SearchedEvents />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
