import React, { useContext } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { NavLink, useParams } from "react-router-dom";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import "./SearchedEvents.css";

export default function SearchedEvents() {
  const { searchedLocation } = useParams();
  const { foundEvents, categoryArray } = useContext(SectionsContext);

  const renderEvents = (dataArray) => {
    return dataArray.map((oneEvent, i) => {
      return (
        <li key={i}>
          <h3>{oneEvent.eventTitle}</h3>
          <img src={"http://localhost:6001" + oneEvent.imageUrl} alt="" />

          <NavLink to={`/event/${oneEvent._id}`} className="button-green">
            Ansehen
          </NavLink>
        </li>
      );
    });
  };

  return (
    <div className="SearchedEvents">
      <CategoryFilter />
      <div>
        <h2>Vorschläge für dich in {searchedLocation}</h2>
        <ul>
          {foundEvents && !categoryArray && renderEvents(foundEvents)}
          {categoryArray && renderEvents(categoryArray)}
        </ul>
      </div>
    </div>
  );
}
