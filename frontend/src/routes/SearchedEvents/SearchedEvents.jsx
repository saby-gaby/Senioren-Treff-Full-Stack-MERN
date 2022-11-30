import React, { useContext, useState } from "react";
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
        <div key={i}>
          {new Date(oneEvent.date) > Date.now() && (
            <li className="box" key={i}>
              <h3>{oneEvent.eventTitle} </h3>
              {new Date(oneEvent.date) < Date.now() ? (
                <div className="expired">Veranstaltung schon vorbei</div>
              ) : null}{" "}
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
                <img
                  src={"http://localhost:6001" + categoryImage()}
                  alt="test"
                />
              )}
              <h4>
                {new Date(oneEvent.date).toLocaleDateString()} {"||"}{" "}
                {oneEvent.time} Uhr
              </h4>
              <div>
                <NavLink to={`/event/${oneEvent._id}`} className="button-green">
                  Ansehen
                </NavLink>
              </div>
            </li>
          )}
        </div>
      );
    });
  };

  const renderExpiredEvents = (dataArray) => {
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
        <div key={i}>
          {new Date(oneEvent.date) < Date.now() && (
            <li className="box" key={i}>
              <h3>{oneEvent.eventTitle} </h3>
              {new Date(oneEvent.date) < Date.now() ? (
                <div className="expired">Veranstaltung schon vorbei</div>
              ) : null}{" "}
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
                <img
                  src={"http://localhost:6001" + categoryImage()}
                  alt="test"
                />
              )}
              <h4>
                {new Date(oneEvent.date).toLocaleDateString()} {"||"}{" "}
                {oneEvent.time} Uhr
              </h4>
              <div>
                <NavLink to={`/event/${oneEvent._id}`} className="button-green">
                  Ansehen
                </NavLink>
              </div>
            </li>
          )}
        </div>
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
          {foundEvents && !categoryArray && renderExpiredEvents(foundEvents)}
          {categoryArray && renderExpiredEvents(categoryArray)}
        </ul>
      </div>
    </div>
  );
}
