import React, { useContext, useEffect, useState } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { useParams } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig";
import "./CategoryFilter.css";
import swal from "sweetalert";

export default function CategoryFilter() {
  const { searchedLocation } = useParams();
  const currLocation = searchedLocation;
  const { foundEvents, setFoundEvents, setCategoryArray } =
    useContext(SectionsContext);
  const [sport, setSport] = useState(false);
  const [kultur, setKultur] = useState(false);
  const [kurse, setKurse] = useState(false);
  const [reisen, setReisen] = useState(false);
  const [natur, setNatur] = useState(false);
  const [spiele, setSpiele] = useState(false);

  const setAllFalse = () =>{
    setSport(false);
    setKultur(false);
    setKurse(false);
    setReisen(false);
    setNatur(false);
    setSpiele(false);
  }

  const getSearchedEvents = async () => {
    try {
      const axiosResp = await axiosConfig.get(`/search/${currLocation}`);
      setFoundEvents(
        axiosResp.data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const eventByCategory = (searchedCategory) => {
    const array = foundEvents.filter((element) =>
      element.category.some((ele) => ele === searchedCategory)
    );
    if (array[0]) {
      setAllFalse()
      switch (searchedCategory) {
        case "sport":setSport(true);break;
        case "kultur":setKultur(true);break;
        case "kurse":setKurse(true);break;
        case "reisen":setReisen(true);break;
        case "natur":setNatur(true);break;
        case "spiele":setSpiele(true);break;
      }
      setCategoryArray(array);
    } else {
      swal({
        title: "keine Treffer",
        button: "OK",
      });
    }
  };

  useEffect(() => {
    getSearchedEvents();
  }, []);

  return (
    <div className="selection">
      <button onClick={() => eventByCategory("sport")} className={sport? "checked":"button"}>
        Sport
      </button>
      <button onClick={() => eventByCategory("kurse")} className={kurse ? "checked":"button"}>
        Kurse
      </button>
      <button onClick={() => eventByCategory("kultur")} className={kultur ? "checked":"button"}>
        Kultur
      </button>
      <button onClick={() => eventByCategory("reisen")} className={reisen ? "checked":"button"}>
        Reisen
      </button>
      <button onClick={() => eventByCategory("natur")} className={natur ? "checked":"button"}>
        Natur
      </button>
      <button onClick={() => eventByCategory("spiele")} className={spiele ? "checked":"button"}>
        Spiele
      </button>
    </div>
  );
}
