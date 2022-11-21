import React, { useContext } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { NavLink } from "react-router-dom";
import "./SearchedEvents.css";

export default function SearchedEvents() {
  const { foundEvents } = useContext(SectionsContext);
  console.log(foundEvents);

  return (
    <div>
      SearchedEvents
      <div id="Auswahl">
        <div class="selection">
          <div class="box">
            <button>Sport</button>
          </div>
          <div class="box">
            <button>Kurse</button>
          </div>
          <div class="box">
            <button>Kultur</button>
          </div>
          <div class="box">
            <button>Reisen</button>
          </div>
          <div class="box">
            <button>Natur</button>
          </div>
          <div class="box">
            <button>Spiele</button>
          </div>
        </div>
      </div>
      <div>
        <h2>Vorschläge für dich</h2>
        <ul>
          {foundEvents &&
            foundEvents.map((oneEvent, i) => {
              return (
                <li key={i}>
                  <h3>{oneEvent.eventTitle}</h3>
                  <img
                    src={"http://localhost:6001" + oneEvent.imageUrl}
                    alt=""
                  />
                  <button id="button">
                    <NavLink to={`/event/${oneEvent._id}`}>Ansehen</NavLink>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
