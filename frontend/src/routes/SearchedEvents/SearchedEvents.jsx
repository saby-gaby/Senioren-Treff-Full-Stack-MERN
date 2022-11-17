import React, { useContext } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { NavLink } from "react-router-dom";


export default function SearchedEvents() {

  const { foundEvents } = useContext(SectionsContext);
  console.log(foundEvents);

  return (
    <div>
      SearchedEvents
      <div>
        <button>Sport</button>
        <button>Kurse</button>
        <button>Kultur</button>
        <button>Reisen</button>
        <button>Natur</button>
        <button>Spiele</button>
      </div>
      <div>
        <h2>Vorschläge für dich</h2>
        <ul>
          {foundEvents &&
            foundEvents.map((oneEvent, i) => {
              return (
                <li key={i}>
                  <h3>{oneEvent.eventTitle}</h3>
                  <img src={"http://localhost:6001" + oneEvent.imageUrl} alt="" />
                  <NavLink to={`/event/${oneEvent._id}`}>Ansehen</NavLink>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
