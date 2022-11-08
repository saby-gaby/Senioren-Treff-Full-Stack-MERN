import React, { useContext } from "react";
import { SectionsContext } from "./context/sectionsContext.js";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import EventForm from "./components/EventForm/EventForm";
import OneEvent from './components/OneEvent/OneEvent';
import SearchedEvent from './components/SearchedEvents/SearchedEvents';
import UserProfile from './components/UserProfile/UserProfile'
import AuthLogin from "./util/AuthLogin.js";

function App() {
  const {
    isHome,
    isLogin,
    isRegister,
    isEventForm,
    isOneEvent,
    isSearchedEvents,
    isUserProfile,
  } = useContext(SectionsContext);

  return (
    <div className="App">
      {isHome && <Home />}
      {isLogin && <Login />}
      {isRegister && <RegisterForm />}
      {isEventForm && <EventForm />}
      {isOneEvent && <OneEvent />}
      {isSearchedEvents && <SearchedEvent />}
      {isUserProfile && <UserProfile />}
      <AuthLogin />
    </div>
  );
}

export default App;
