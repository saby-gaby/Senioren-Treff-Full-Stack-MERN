import React, { useContext, useRef } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { NavLink } from "react-router-dom";
import "./Home.css";
import Search from "../../components/Search/Search";


export default function Home() {
  const { isAuth, setEventLogin } = useContext(SectionsContext);

  return (
    <div className="Home">
      <Search />
        <div>
          <h2>Veranstaltung erstellen</h2>
          <button id="button">
            {isAuth ? <NavLink to="/event-form">Erstellen</NavLink> : <NavLink to="/login" onClick={()=> setEventLogin(true)}>Erstellen</NavLink>}
          </button
        </div>
    </div>
  );
}
