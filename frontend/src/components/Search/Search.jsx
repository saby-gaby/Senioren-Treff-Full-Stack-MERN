import React, { useContext, useRef, useState } from "react";
import axiosConfig from "../../util/axiosConfig";
import { SectionsContext } from "../../context/sectionsContext";
import swal from 'sweetalert';
import "./Search.css";

export default function Search() {
  const { navigate, isAuth, capitalize } = useContext(SectionsContext);
  const formElement = useRef(null);
  const locationElement = useRef(null);

  let defSearch;
  if(isAuth){
    defSearch = localStorage.getItem("defSearch");
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const location = locationElement.current.value.toLowerCase();

    if (!location && !isAuth) {
      swal({
        title:"Bitte gib eine Stadt ein", 
        text: "Nochmal probieren?"
      })
    } else if (!location && isAuth) {
      try {
        const axiosResp = await axiosConfig.get(`/search/${defSearch}`);
        if (axiosResp.data[0]) {
          navigateToEvents(defSearch);
        } else {
          swal({
            title: `Keine Veranstaltungen in ${capitalize(defSearch)} gefunden`,
          }) 
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
          swal({
            title: `Keine Veranstaltungen in ${capitalize(location)} gefunden`,
          }) 
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
            placeholder="Dein Ort"
            defaultValue={isAuth ? capitalize(defSearch):null}
          />
          <input className="button-green" type="submit" value="Los geht's!" />
        </form>
      </div>
    </div>
  );
}
