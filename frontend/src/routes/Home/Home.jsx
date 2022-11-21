import React, { useContext, useRef } from "react";
import axiosConfig from "../../util/axiosConfig";
import { SectionsContext } from "../../context/sectionsContext";
import { NavLink } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const { setFoundEvents, navigate, isAuth, setEventLogin } =
    useContext(SectionsContext);
  const formElement = useRef(null);
  const locationElement = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const location = locationElement.current.value;
    if (!location) {
      alert("bitte gib eine Stadt ein");
    }
    try {
      const axiosResp = await axiosConfig.get(`/search/${location}`);
      if (axiosResp.data[0]) {
        setFoundEvents(axiosResp.data);
        navigateToEvents();
      } else {
        alert("keine Veranstaltungen in deiner Stadt gefunden");
      }
    } catch (error) {}
  };

  const navigateToEvents = () => {
    navigate("/events");
  };

  return (
    <div className="Home">
      <div>
        <h1>Veranstaltungen in deiner Nähe</h1>
        <p>Wo bist du gerade?</p>
        <form ref={formElement} method="" onSubmit={submitHandler}>
          <input ref={locationElement} type="text" />
          <input id="button" type="submit" value="Los geht´s!" />
        </form>
      </div>
      <div>
        <h2>Veranstaltung erstellen</h2>
        <button id="button">
          {isAuth ? (
            <NavLink to="/event-form">Erstellen</NavLink>
          ) : (
            <NavLink to="/login" onClick={() => setEventLogin(true)}>
              Erstellen
            </NavLink>
          )}
        </button>
      </div>
    </div>
  );
}
