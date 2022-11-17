import React, { useContext, useRef } from "react";
import axiosConfig from "../../util/axiosConfig";
import { SectionsContext } from "../../context/sectionsContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  const { foundEvents, setFoundEvents } = useContext(SectionsContext);
  const formElement = useRef(null);
  const locationElement = useRef(null);
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    const location = locationElement.current.value;
    if (!location) {alert("bitte gib eine Stadt ein")}
    try {
      const axiosResp = await axiosConfig.get(`/search/${location}`);
      if (axiosResp.data[0]) {  
        setFoundEvents(axiosResp.data);
        navigateToEvents()
      }  else {
        alert("keine Veranstaltungen in deiner Stadt gefunden")
      }
    } catch (error) {
    }
  };

  const navigateToEvents = () => {
    navigate("/events")
  }

  return (
    <div className="Home">
      <div>
        <h1>Veranstaltungen in deiner Nähe</h1>
        <p>Wo bist du gerade?</p>
        <form ref={formElement} method="" onSubmit={submitHandler}>
          <input ref={locationElement} type="text" />
          <input type="submit" value="Los geht´s!" />
        </form>
      </div>
      <div>
        <h2>Veranstaltung erstellen</h2>
        <NavLink to="/event-form">Erstellen</NavLink>
      </div>
    </div>
  );
}
