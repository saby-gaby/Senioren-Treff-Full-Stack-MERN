import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SectionsContext } from "../../context/sectionsContext";
import axiosConfig from "../../util/axiosConfig";
import Search from "../../components/Search/Search";
import RainbowEffect from "../../components/DiverseEffect/RainbowEffect";
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
    <div id="UserProfile">
      <h2>
        {userData.gender === "female" && <img src="oma.svg" />}
        {userData.gender === "male" && <img src="opa.svg" />}Willkommen{" "}
        {userData.gender==="diverse"?<RainbowEffect name={userData.firstName} />:userData.firstName}
      </h2>
      <div>
        <Search />
        <div id="eventbox">
          <h4>Eigene Veranstaltungen</h4>
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
        <div id="eventbox">
          <h4>Gebuchte Veranstaltungen</h4>
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

        <div id="eventbox">
          <h4>Meine Merkliste</h4>
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

        <div id="eventbox">
          <h4>Meine Daten</h4>
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
          <div id="dataUser">
            <ul>
              <li>
                <h5>Benutzername:</h5> <p>{userData.userName}</p>
              </li>
              <li>
                <h5>Vorname:</h5> <p>{userData.firstName}</p>
              </li>
              <li>
                <h5>Nachname:</h5> <p>{userData.lastName}</p>
              </li>
              <li>
                <h5>Geschlecht: </h5>
                <p>{findGender()}</p>
              </li>
              <li>
                <h5> Einschränkungen:</h5>{" "}
                <p>
                  {userData.disabilities
                    ? userData.disabilities
                    : "keine Einschränkungen"}
                </p>
              </li>
              <li>
                <h5>Email:</h5>
                <p> {userData.email}</p>
              </li>

              <li>
                <h5>Wohnort:</h5> <p>{userData.location}</p>
              </li>
              <li>
                <NavLink to={`/user/edit`} className="button-green">
                  Profil bearbeiten
                </NavLink>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      <div id="vorletztesDiv">
        <NavLink to={`/event-form`} className="button-beige ">
          Eigene Veranstaltung Erstellen
        </NavLink>
      </div>

      <div>
        <button className="button-green" onClick={logout}>
          Abmelden
        </button>
      </div>
    </div>
  );
}
