import React, { useContext, useRef, useState } from "react";
import axiosConfig from "../../util/axiosConfig";
import { SectionsContext } from "../../context/sectionsContext";
import "./Search.css";

export default function Search() {
  const { navigate, isAuth } = useContext(SectionsContext);
  const formElement = useRef(null);
  const locationElement = useRef(null);
  const defSearch = localStorage.getItem("defSearch");

  const submitHandler = async (e) => {
    e.preventDefault();

    const location = locationElement.current.value;
    console.log(defSearch);

    if (!location && !isAuth) {
      alert("bitte gib eine Stadt ein");
    } else if (!location && isAuth) {
      try {
        const axiosResp = await axiosConfig.get(`/search/${defSearch}`);
        if (axiosResp.data[0]) {
          navigateToEvents(defSearch);
        } else {
          alert(`keine Veranstaltungen in ${defSearch} gefunden`);
        }
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        const axiosResp = await axiosConfig.get(`/search/${location}`);
        if (axiosResp.data[0]) {
          navigateToEvents(location);
        } else {
          alert(`keine Veranstaltungen in ${location} gefunden`);
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const navigateToEvents = (path) => {
    navigate(`/events/${path}`);
  };

  return (
    <div className="Search">
      <div>
        <h1>Veranstaltungen in deiner Nähe</h1>
        <p>Wo bist du gerade?</p>
        <form ref={formElement} method="" onSubmit={submitHandler}>
          <input
            ref={locationElement}
            type="text"
            placeholder={isAuth ? defSearch : "Dein Ort"}
          />
          <input className="button-green" type="submit" value="Los geht's!" />
        </form>
      </div>
    </div>
  );
}
