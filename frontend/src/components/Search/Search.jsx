import React, { useContext, useRef, useState } from "react";
import axiosConfig from "../../util/axiosConfig";
import { SectionsContext } from "../../context/sectionsContext";

export default function Search() {
  const { navigate } = useContext(SectionsContext);
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
        navigateToEvents();
      } else {
        alert("keine Veranstaltungen in deiner Stadt gefunden");
      }
    } catch (error) { 
      alert(error)
    }
  };

  const navigateToEvents = () => {
    navigate(`/events/${locationElement.current.value}`);
  };

  return (
    <div className="Search">
      <div>
        <h1>Veranstaltungen in deiner Nähe</h1>
        <p>Wo bist du gerade?</p>
        <form ref={formElement} method="" onSubmit={submitHandler}>
          <input ref={locationElement} type="text" />
          <input className="button" type="submit" value="Los geht´s!" />
        </form>
      </div>
    </div>
  );
}
