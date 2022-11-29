import React, { useContext, useEffect, useState } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { useParams } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig";
import "./CategoryFilter.css";

export default function CategoryFilter() {
  const { searchedLocation } = useParams();
  const currLocation = searchedLocation;
  const { foundEvents, setFoundEvents, setCategoryArray } =
    useContext(SectionsContext);

  const getSearchedEvents = async () => {
    try {
      const axiosResp = await axiosConfig.get(`/search/${currLocation}`);
      setFoundEvents(axiosResp.data);
    } catch (error) {
      console.log(error);
    }
  };
  const eventByCategory = (searchedCategory) => {
    const array = foundEvents.filter((element) =>
      element.category.some((ele) => ele === searchedCategory)
    );
    if (array[0]) {
      setCategoryArray(array);
    } else {
      alert("keine treffer");
    }
  };

  useEffect(() => {
    getSearchedEvents();
  }, []);

  return (
    <div className="selection">
      <button onClick={() => eventByCategory("sport")} className="button">
        Sport
      </button>
      <button onClick={() => eventByCategory("kurse")} className="button">
        Kurse
      </button>
      <button onClick={() => eventByCategory("kultur")} className="button">
        Kultur
      </button>
      <button onClick={() => eventByCategory("reisen")} className="button">
        Reisen
      </button>
      <button onClick={() => eventByCategory("natur")} className="button">
        Natur
      </button>
      <button onClick={() => eventByCategory("spiele")} className="button">
        Spiele
      </button>
    </div>
  );
}
