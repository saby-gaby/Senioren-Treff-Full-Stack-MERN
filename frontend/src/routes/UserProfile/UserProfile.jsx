import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SectionsContext } from "../../context/sectionsContext";
import axiosConfig from "../../util/axiosConfig";
import Search from "../../components/Search/Search";
import "./UserProfil.css";

export default function UserProfil() {
  const { logout, isAuth, userData, setUserData } = useContext(SectionsContext);

  const [showMyEvents, setShowMyEvents] = useState(false);
  const [watchedEvents, setWatchedEvents] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [bookedEvents, setBookedEvents] = useState(false);

  const userId = localStorage.getItem("userId");

  const getUserData = async () => {
    const axiosResp = await axiosConfig.get(
      `http://localhost:6001/user/${userId}`
    );
    const data = axiosResp.data;
    setUserData(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const findGender = () => {
    let gender;

    switch (userData.gender) {
      case "female":
        gender = "weiblich";
        break;
      case "male":
        gender = "männlich";
        break;
      case "diverse":
        gender = "nicht binär";
        break;
      case "none":
        gender = "keine Angabe";
        break;
    }
    return gender;
  };

  return (
    <div>
      <h2>Herzlich willkommen {userData.userName}</h2>
      <div>
        <div>
          <h2>Meine erstellten Events:</h2>
          {!showMyEvents ? (
            <button
              className="button-dark-green"
              onClick={() => setShowMyEvents(true)}
            >
              Ansehen
            </button>
          ) : (
            <button
              className="button-beige"
              onClick={() => setShowMyEvents(false)}
            >
              Zuklappen
            </button>
          )}
        </div>

        {showMyEvents ? (
          <div className="RaisedEvents">
            <div className="ShowEvents">
              <ul>
                {userData.myEvents &&
                  userData.myEvents.map((ele, i) => {
                    const categoryImage = () => {
                      let image;
                      switch (ele.category[0]) {
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
                        <h3>{ele.eventTitle}</h3>
                        {new Date(ele.date) < Date.now() ? (
                          <div className="expired">
                            Veranstaltung schon vorbei :-/
                          </div>
                        ) : null}{" "}
                        {ele.imageUrl ? (
                          <img
                            src={"http://localhost:6001" + ele.imageUrl}
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
                          {new Date(ele.date).toLocaleDateString()} {"||"}{" "}
                          {ele.time} Uhr
                        </h4>
                        <div>
                          <NavLink
                            to={`/event/${ele._id}`}
                            className="button-green"
                          >
                            Ansehen
                          </NavLink>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        ) : null}
        <div>
          <h2>gebuchte Veranstaltungen:</h2>
          {!bookedEvents ? (
            <button
              className="button-dark-green"
              onClick={() => setBookedEvents(true)}
            >
              Ansehen
            </button>
          ) : (
            <button
              className="button-beige"
              onClick={() => setBookedEvents(false)}
            >
              Zuklappen
            </button>
          )}
        </div>

        {bookedEvents ? (
          <div className="RaisedEvents">
            <div className="ShowEvents">
              <ul>
                {userData.bookedEvents &&
                  userData.bookedEvents.map((ele, i) => {
                    const categoryImage = () => {
                      let image;
                      switch (ele.category[0]) {
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
                        <h3>{ele.eventTitle}</h3>
                        {new Date(ele.date) < Date.now() ? (
                          <div className="expired">
                            Veranstaltung schon vorbei :-/
                          </div>
                        ) : null}{" "}
                        {ele.imageUrl ? (
                          <img
                            src={"http://localhost:6001" + ele.imageUrl}
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
                          {new Date(ele.date).toLocaleDateString()} {"||"}{" "}
                          {ele.time} Uhr
                        </h4>
                        <div>
                          <NavLink
                            to={`/event/${ele._id}`}
                            className="button-green"
                          >
                            Ansehen
                          </NavLink>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        ) : null}

        <div>
          <h2>Meine Merkliste:</h2>
          {!watchedEvents ? (
            <button
              className="button-dark-green"
              onClick={() => setWatchedEvents(true)}
            >
              Ansehen
            </button>
          ) : (
            <button
              className="button-beige"
              onClick={() => setWatchedEvents(false)}
            >
              Zuklappen
            </button>
          )}
        </div>
        {watchedEvents ? (
          <div className="RaisedEvents">
            <div className="ShowEvents">
              <ul>
                {userData.watchedEvents &&
                  userData.watchedEvents.map((ele, i) => {
                    const categoryImage = () => {
                      let image;
                      switch (ele.category[0]) {
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
                        <h3>{ele.eventTitle}</h3>
                        {new Date(ele.date) < Date.now() ? (
                          <div className="expired">
                            Veranstaltung schon vorbei :-/
                          </div>
                        ) : null}{" "}
                        {ele.imageUrl ? (
                          <img
                            src={"http://localhost:6001" + ele.imageUrl}
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
                          {new Date(ele.date).toLocaleDateString()} {"||"}{" "}
                          {ele.time} Uhr
                        </h4>
                        <div>
                          <NavLink
                            to={`/event/${ele._id}`}
                            className="button-green"
                          >
                            Ansehen
                          </NavLink>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        ) : null}

        <div>
          <h3>Meine Daten</h3>
          {!userDetails ? (
            <button
              className="button-dark-green"
              onClick={() => setUserDetails(true)}
            >
              Ansehen
            </button>
          ) : (
            <button
              className="button-beige"
              onClick={() => setUserDetails(false)}
            >
              Zuklappen
            </button>
          )}
        </div>

        {userDetails ? (
          <ul>
            <li>Benutzername: {userData.userName}</li>
            <li>Vorname: {userData.firstName}</li>
            <li>Nachname: {userData.lastName}</li>
            <li>Geschlecht: {findGender()}</li>
            <li>
              Einschränkungen:{" "}
              {userData.disabilities
                ? userData.disabilities
                : "keine Einschränkungen"}
            </li>
            <li>Email: {userData.email}</li>

            <li>Wohnort: {userData.location}</li>
            <li>
              <NavLink to={`/user/edit`} className="button-green">
                Profil bearbeiten
              </NavLink>
            </li>
          </ul>
        ) : null}
      </div>
      <div>
        <NavLink to={`/event-form`} className="button-green ">
          Eigene Veranstaltung Erstellen
        </NavLink>
      </div>
      <Search />
      <div>
        <button className="button-green" onClick={logout}>
          Abmelden
        </button>
      </div>
    </div>
  );
}
