import React, { useContext, useRef, useState } from "react";
import axiosConfig from "../../util/axiosConfig";
import { SectionsContext } from "../../context/sectionsContext";
import swal from 'sweetalert';
import "./Search.css";

export default function Search() {
  const { navigate, isAuth, capitalize } = useContext(SectionsContext);
  const formElement = useRef(null);
  const locationElement = useRef(null);

  let defSearch;
  if(isAuth){
    defSearch = localStorage.getItem("defSearch");
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const location = locationElement.current.value.toLowerCase();

    if (!location && !isAuth) {
      swal({
        title:"Bitte gib eine Stadt ein", 
        text: "Nochmal probieren?"
      })
    } else if (!location && isAuth) {
      try {
        const axiosResp = await axiosConfig.get(`/search/${defSearch}`);
        if (axiosResp.data[0]) {
          navigateToEvents(defSearch);
        } else {
          swal({
            title: `Keine Veranstaltungen in ${capitalize(defSearch)} gefunden`,
          }) 
        }
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        const axiosResp = await axiosConfig.get(`/search/${location}`);
        if (axiosResp.data[0]) {
          navigateToEvents(location);
        } else {
          swal({
            title: `Keine Veranstaltungen in ${capitalize(location)} gefunden`,
          }) 
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  const navigateToEvents = (path) => {
    navigate(`/events/${path}`);
    location.reload()
  };

  return (
    <div className="Search">
      <div>
        <h1>Veranstaltungen in deiner Nähe</h1>
        <p>Wo bist du gerade?</p>
        <form ref={formElement} method="" onSubmit={submitHandler}>
          <input
            list="places"
            id="city"
            name="city"
            ref={locationElement}
            type="text"
            placeholder="Dein Ort"
            defaultValue={isAuth ? capitalize(defSearch):null}
          />
        <datalist id="places">
            <option>Berlin</option>
            <option>Hamburg</option>
            <option>München</option>
            <option>Köln</option>
            <option>Frankfurt am Main</option>
            <option>Stuttgart</option>
            <option>Düsseldorf</option>
            <option>Leipzig</option>
            <option>Dortmund</option>
            <option>Essen</option>
            <option>Bremen</option>
            <option>Dresden</option>
            <option>Hannover</option>
            <option>Nürnberg</option>
            <option>Duisburg</option>
            <option>Bochum</option>
            <option>Wuppertal</option>
            <option>Bielefeld</option>
            <option>Bonn</option>
            <option>Münster</option>
            <option>Mannheim</option>
            <option>Karlsruhe</option>
            <option>Augsburg</option>
            <option>Wiesbaden</option>
            <option>Mönchengladbach</option>
            <option>Gelsenkirchen</option>
            <option>Aachen</option>
            <option>Braunschweig</option>
            <option>Kiel</option>
            <option>Chemnitz</option>
            <option>Halle (Saale)</option>
            <option>Magdeburg</option>
            <option>Freiburg im Breisgau</option>
            <option>Krefeld</option>
            <option>Mainz</option>
            <option>Lübeck</option>
            <option>Erfurt</option>
            <option>Oberhausen</option>
            <option>Rostock</option>
            <option>Kassel</option>
            <option>Hagen</option>
            <option>Potsdam</option>
            <option>Saarbrücken</option>
            <option>Hamm</option>
            <option>Ludwigshafen am Rhein</option>
            <option>Mülheim an der Ruhr</option>
            <option>Oldenburg (Oldb)</option>
            <option>Osnabrück</option>
            <option>Leverkusen</option>
            <option>Darmstadt</option>
            <option>Heidelberg</option>
            <option>Solingen</option>
            <option>Herne</option>
            <option>Regensburg</option>
            <option>Neuss</option>
            <option>Paderborn</option>
            <option>Ingolstadt</option>
            <option>Offenbach am Main</option>
            <option>Fürth</option>
            <option>Würzburg</option>
            <option>Ulm</option>
            <option>Heilbronn</option>
            <option>Pforzheim</option>
            <option>Wolfsburg</option>
            <option>Bottrop</option>
            <option>Göttingen</option>
            <option>Reutlingen</option>
            <option>Koblenz</option>
            <option>Erlangen</option>
            <option>Bremerhaven</option>
            <option>Remscheid</option>
            <option>Bergisch Gladbach</option>
            <option>Recklinghausen</option>
            <option>Trier</option>
            <option>Jena</option>
            <option>Moers</option>
            <option>Salzgitter</option>
            <option>Siegen</option>
            <option>Gütersloh</option>
            <option>Hildesheim</option>
        </datalist>

          <input className="button-green" type="submit" value="Los geht's!" />
        </form>
      </div>
    </div>
  );
}
