import React, { useContext, useRef } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { NavLink } from "react-router-dom";
import "./Home.css";
import Search from "../../components/Search/Search";
import swal from "sweetalert";

export default function Home() {
  const { isAuth, setEventLogin } = useContext(SectionsContext);

  return (
    <div className="Home">
      <Search />
      <div className="create">
        <h2>Veranstaltung erstellen</h2>
        {isAuth ? (
          <NavLink to="/event-form" className="button-green">
            Erstellen
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="button-green"
            onClick={() => {
              swal({
                title:
                  "Du musst angemeldet sein, um eine Veranstaltung zu erstellen.",
                button: "OK",
              });
              setEventLogin(true);
            }}
          >
            Erstellen
          </NavLink>
        )}
      </div>
    </div>
  );
}
