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
import UpdateUser from "./routes/UpdateUser/UpdateUser";

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
          <ul className={location.pathname === "/login"?"logo-center":null}>
            <li>
              <NavLink to="/">
                <img src="logo.svg" />
              </NavLink>
            </li>
            {location.pathname !== "/login" && (
              <li>
                {isAuth && location.pathname === "/profile" && <span className="text">Mein Bereich</span>}
                {(isAuth && location.pathname !== "/profile" && location.pathname !== "/register") && <NavLink to="/profile" className="navBtn">Mein Bereich</NavLink>}
                {location.pathname === "/register" && <span className="text">Registrieren</span>}
                {(!isAuth && location.pathname !=="/register" ) && <NavLink to="/login" className="navBtn">Anmelden / Registrieren</NavLink>}
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
        <NavLink to="/events">Events</NavLink>
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/event-form" element={<EventForm />} />
          <Route path="/event/:id" element={<OneEvent />} />
          <Route path="/events/:searchedLocation" element={<SearchedEvents />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="/user/edit" element={<UpdateUser />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
