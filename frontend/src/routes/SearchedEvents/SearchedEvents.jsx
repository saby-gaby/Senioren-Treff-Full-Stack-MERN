import React, { useContext, useEffect, useState } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { NavLink, useParams } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig";

export default function SearchedEvents() {
  const { searchedLocation } = useParams();
  const currLocation = searchedLocation;
  const { foundEvents, setFoundEvents } = useContext(SectionsContext);
  const [filteredArray, setFilteredArray] = useState();

  const getSearchedEvents = async () => {
    try {
      const axiosResp = await axiosConfig.get(`/search/${currLocation}`);
      setFoundEvents(axiosResp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sportEvents = (searchedCategory) => {
    const array = foundEvents.filter((element) =>
      element.category.some((ele) => ele === searchedCategory)
    );
    if (array[0]) {
      setFilteredArray(array);
    } else {
      alert("keine treffer");
    }
  };

  const renderEvents = (dataArray) =>{
    return dataArray.map((oneEvent, i) => {
      return (
        <li key={i}>
          <h3>{oneEvent.eventTitle}</h3>
          <img
            src={"http://localhost:6001" + oneEvent.imageUrl}
            alt=""
          />
          <NavLink to={`/event/${oneEvent._id}`}>Ansehen</NavLink>
        </li>
      );
    })
  }

  useEffect(() => {
    getSearchedEvents();
  }, []);

  return (
    <div className="SearchedEvents">
      <div>
        <button onClick={() => sportEvents("sport")}>Sport</button>
        <button onClick={() => sportEvents("kurse")}>Kurse</button>
        <button onClick={() => sportEvents("kultur")}>Kultur</button>
        <button onClick={() => sportEvents("reisen")}>Reisen</button>
        <button onClick={() => sportEvents("natur")}>Natur</button>
        <button onClick={() => sportEvents("spiele")}>Spiele</button>
      </div>
      <div>
        <h2>Vorschläge für dich</h2>
        <ul>
          {foundEvents &&
            !filteredArray && renderEvents(foundEvents)}
          {filteredArray && renderEvents(filteredArray)}
        </ul>
      </div>
    </div>
  );
}
