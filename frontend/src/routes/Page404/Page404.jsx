import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SectionsContext } from "../../context/sectionsContext";
import "./Page404.css";

export default function Page404() {
  const {navigate} = useContext(SectionsContext)
  return (
    <div className="Page404">
      <div>
        <img src="error404.svg" alt="" />
        <div>
          <h1>Die Seite wurde nicht gefunden</h1>
          <div className="buttons">
            <NavLink to="/" className="button-green">
              Zur Startseite
            </NavLink>
            <span>oder</span>
            <button onClick={()=>navigate(-1)} className="button-beige">
              Schritt zurück
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
