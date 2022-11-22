import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SectionsContext } from "../../context/sectionsContext";
import axiosConfig from "../../util/axiosConfig";
import Search from "../../components/Search/Search";

export default function UserProfil() {
  const { logout, isAuth } = useContext(SectionsContext);

  const [myEvents, setMyEvents] = useState(false);
  const [watchedEvents, setWatchedEvents] = useState(false);
  const [userDetails, setUserDetails] = useState(false);

  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const axiosResp = await axiosConfig.get(
      `http://localhost:6001/user/${userId}`
    );
    const data = axiosResp.data;
    setUserData(data);
    localStorage.setItem("defSearch", data.location);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h2>Herzlich willkommen {userData.userName}</h2>
      <div>
        <div>
          <h2>Meine erstellten Events:</h2>
          {!myEvents ? (
            <button className="button" onClick={() => setMyEvents(true)}>
              Ansehen
            </button>
          ) : (
            <button className="button" onClick={() => setMyEvents(false)}>
              Zuklappen
            </button>
          )}
        </div>

        {myEvents ? (
          <ul>
            {userData.myEvents &&
              userData.myEvents.map((ele, i) => {
                return (
                  <li key={i}>
                    <h4>{ele.eventTitle}</h4>
                    <img
                      src={`http://localhost:6001${ele.imageUrl}`}
                      alt={ele.imageUrl}
                    />
                    <NavLink to={`/event/${ele._id}`} className="button">
                      Ansehen
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        ) : null}
        <div>
          <h2>Meine Merkliste:</h2>
          {!watchedEvents ? (
            <button className="button" onClick={() => setWatchedEvents(true)}>
              Ansehen
            </button>
          ) : (
            <button className="button" onClick={() => setWatchedEvents(false)}>
              Zuklappen
            </button>
          )}
        </div>

        {watchedEvents ? (
          <ul>
            {userData.watchedEvents &&
              userData.watchedEvents.map((ele, i) => {
                return (
                  <li key={i}>
                    <h4>{ele.eventTitle}</h4>
                    <img
                      src={`http://localhost:6001${ele.imageUrl}`}
                      alt={ele.imageUrl}
                    />
                    <NavLink to={`/event/${ele._id}`} className="button">
                      Ansehen
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        ) : null}

        <div>
          <h3>Meine Daten</h3>
          {!userDetails ? (
            <button className="button" onClick={() => setUserDetails(true)}>
              Ansehen
            </button>
          ) : (
            <button className="button" onClick={() => setUserDetails(false)}>
              Zuklappen
            </button>
          )}
        </div>

        {userDetails ? (
          <ul>
            <li>userName: {userData.userName}</li>
            <li>firstName: {userData.firstName}</li>
            <li>lastName: {userData.lastName}</li>
            <li>gender: {userData.gender}</li>
            <li>
              disabilities:{" "}
              {userData.disabilities
                ? userData.disabilities
                : "keine Einschränkungen"}
            </li>
            <li>email: {userData.email}</li>

            <li>location: {userData.location}</li>
          </ul>
        ) : null}
      </div>
      <div>
        <NavLink to={`/event-form`} className="button">
          Eigene Veranstaltung Erstellen
        </NavLink>
      </div>
      <Search />
      <div>
        <button className="button" onClick={logout}>
          Abmelden
        </button>
      </div>
    </div>
  );
}
