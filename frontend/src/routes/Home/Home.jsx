import React, { useContext, useState, useRef, useEffect } from "react";
import axiosConfig from "../../util/axiosConfig";
import { SectionsContext } from "../../context/sectionsContext";
import { Navigate, NavLink } from "react-router-dom";

export default function Home() {
  const { foundEvents, setFoundEvents } = useContext(SectionsContext);
  const formElement = useRef(null);
  const locationElement = useRef(null);
  const [found, setFound] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    const location = locationElement.current.value;
    try {
      const axiosResp = await axiosConfig.get(`/search/${location}`);
      if (axiosResp.data[0]) {
        setFound(true);
        setFoundEvents(axiosResp.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    setFound(false);
    console.log(foundEvents);
  }, [foundEvents]);

  return (
    <div className="Home">
      {found && <Navigate to="/events" />}
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
