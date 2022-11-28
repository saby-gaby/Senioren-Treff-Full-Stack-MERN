import React, { useEffect, useState, useContext } from "react";
import axiosConfig from "../../util/axiosConfig";
import { NavLink, useParams } from "react-router-dom";
import "./OneEvent.css";
import { SectionsContext } from "../../context/sectionsContext";

export default function OneEvent() {
  const { id } = useParams();
  const eventId = id;

  const { myEvent, setMyEvent } = useContext(SectionsContext);

  const [eventData, setEventData] = useState({});
  const [eventCategories, setEventCategories] = useState(null);

  const getEventData = () => {
    const getEventById = async () => {
      const axiosResp = await axiosConfig.get(
        `http://localhost:6001/event/${eventId}`
      );
      const data = axiosResp.data;
      setEventData(data);
      setEventCategories(data.category.join(", "));
    };
    getEventById();
  };

  useEffect(() => {
    getEventData();
  }, []);

  const handleSubscribeEvent = async () => {
    let subsArr = [];

    eventData.subscribers.map((ele, i) => {
      subsArr.push(ele._id);
    });
    try {
      if (
        eventData.participants == "0" ||
        subsArr.includes(localStorage.getItem("userId"))
      ) {
        if (subsArr.includes(localStorage.getItem("userId"))) {
          alert("du hast die Veranstaltung schon gebucht");
        } else {
          alert("leider schon ausgebucht");
        }
      } else {
        await axiosConfig.patch(`/event/subscribe/${eventId}`, {
          subscribers: localStorage.getItem("userId"),
        });
        await axiosConfig.patch(`/event/${eventId}`, {
          participants: parseInt(eventData.participants) - 1,
        });
        alert("Buchung erfolgreich!");
      }
      getEventData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatchEvent = async () => {
    try {
      const response = await axiosConfig.patch(
        `/user/watchedEvents/${localStorage.getItem("userId")}`,
        {
          watchedEvents: eventId,
        }
      );

      alert(
        `${eventData.eventTitle} zur Merkliste von ${response.data.userName} hinzugefügt`
      );
    } catch (error) {
      console.log(error);
    }
  };
  const categoryImage = () => {
    let image;
    switch (eventData.category) {
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
    <div>
      <h3>{eventData.eventTitle}</h3>
      <p>
        Eventersteller: {eventData.eventOwner && eventData.eventOwner.userName}{" "}
      </p>
      {eventData.imageUrl ? (
        <img
          src={"http://localhost:6001" + eventData.imageUrl}
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
        <h4>{eventCategories}</h4>
        <p>
          {eventData.location} {new Date(eventData.date).toLocaleDateString()}{" "}
          {eventData.time} Uhr
        </p>
        <p>{eventData.price} €</p>
        <p>Teilnehmerzahl: {eventData.participants}</p>
        <div>
          <h4>Beschreibung</h4>
          <p>{eventData.description}</p>
        </div>
        <ul>
          {eventData.subscribers &&
            eventData.subscribers.map((ele, i) => {
              return <li key={i}>{ele.userName}</li>;
            })}
        </ul>
      </div>
      <button onClick={handleSubscribeEvent} className="button-green">
        Buchen
      </button>
      <button onClick={handleWatchEvent} className="button-beige">
        Merken
      </button>
      {myEvent ? (
        <NavLink
          to={`/event-edit/${eventData._id}`}
          onClick={() => {
            setMyEvent(false);
          }}
          className="button-green"
        >
          bearbeiten
        </NavLink>
      ) : null}
    </div>
  );
}
