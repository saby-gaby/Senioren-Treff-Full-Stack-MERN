import React, { useContext, useState, useRef, useEffect } from "react";
import axiosConfig from "../../util/axiosConfig";
import { SectionsContext } from "../../context/sectionsContext";
export default function Home() {
  const { foundEvents, setFoundEvents } = useContext(SectionsContext);
  const formElement = useRef(null);
  const locationElement = useRef(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    const location = locationElement.current.value;
    try {
      const axiosResp = await axiosConfig.get(`/search/${location}`);
      setFoundEvents(axiosResp.data);
    } catch (error) {}
  };
  useEffect(() => {
    console.log(foundEvents);
  }, [foundEvents]);
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
        <button>Erstellen</button>
      </div>
    </div>
  );
}
