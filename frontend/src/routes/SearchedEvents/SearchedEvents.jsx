import React, { useContext } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { NavLink, useParams } from "react-router-dom";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import "./SearchedEvents.css";

export default function SearchedEvents() {
  const { searchedLocation } = useParams();
  const { foundEvents, categoryArray, capitalize } =
    useContext(SectionsContext);

  const renderEvents = (dataArray) => {
    return dataArray.map((oneEvent, i) => {
      const categoryImage = () => {
        let image;
        switch (oneEvent.category[0]) {
          case "kultur":
            image = "/images/kultur.jpg";
            break;
          case "sport":
            image = "/images/sport.jpg";
            break;
          case "kurse":
            image = "/images/kurse.jpg";
            break;
          case "spiele":
            image = "/images/Würfel.jpg";
            break;
          case "reisen":
            image = "/images/reisen.jpeg";
            break;
          case "natur":
            image = "/images/natur.jpg";
            break;
          default:
            image = "/images/default.webp";
        }
        return image;
      };

      return (
        <li className="box" key={i}>
          <h3>{oneEvent.eventTitle}</h3>
          {oneEvent.imageUrl ? (
            <img
              src={"http://localhost:6001" + oneEvent.imageUrl}
              alt="image not found"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `http://localhost:6001${categoryImage()}`;
              }}
            />
          ) : (
            <img src={"http://localhost:6001" + categoryImage()} alt="test" />
          )}
          <div>
            <NavLink to={`/event/${oneEvent._id}`} className="button-green">
              Ansehen
            </NavLink>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="SearchedEvents">
      <CategoryFilter />
      <div className="FoundEvents">
        <h2>Vorschläge für dich in {capitalize(searchedLocation)}</h2>
        <ul>
          {foundEvents && !categoryArray && renderEvents(foundEvents)}
          {categoryArray && renderEvents(categoryArray)}
        </ul>
      </div>
    </div>
  );
}
