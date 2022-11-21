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
            {isAuth ? <NavLink to="/event-form" className="button">Erstellen</NavLink> : <NavLink to="/login" className="button" onClick={()=> setEventLogin(true)}>Erstellen</NavLink>}
        </div>
    </div>
  );
}
