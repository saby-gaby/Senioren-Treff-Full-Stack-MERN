import React, { useEffect, useState, useContext } from "react";
import axiosConfig from "../../util/axiosConfig";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import "./OneEvent.css";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { SectionsContext } from "../../context/sectionsContext";

export default function OneEvent() {
  const { id } = useParams();
  const eventId = id;

  const { navigate } = useContext(SectionsContext);
  const [myEvent, setMyEvent] = useState(false);
  const [eventData, setEventData] = useState({});
  const [eventCategories, setEventCategories] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const getEventData = () => {
    let subsArr = [];
    const getEventById = async () => {
      const axiosResp = await axiosConfig.get(
        `http://localhost:6001/event/${eventId}`
      );
      const data = axiosResp.data;
      setEventData(data);
      setEventCategories(data.category.join(", "));

      data.subscribers.map((ele, i) => {
        subsArr.push(ele._id);
      });

      let watchedArr = [];

      const userData = await axiosConfig.get(
        `/user/${localStorage.getItem("userId")}`
      );

      userData.data.watchedEvents.map((ele, i) => {
        watchedArr.push(ele._id);
      });

      subsArr.includes(localStorage.getItem("userId"))
        ? setIsBooked(true)
        : setIsBooked(false);

      watchedArr.includes(eventId) ? setIsWatched(true) : setIsWatched(false);

      data.eventOwner._id == localStorage.getItem("userId")
        ? setMyEvent(true)
        : setMyEvent(false);

      new Date(data.date) < Date.now()
        ? setIsExpired(true)
        : setIsExpired(false);
    };
    getEventById();
  };

  const deleteEventById = async () => {
    let myEventsArray = [];
    try {
      if (confirm("Diese Veranstaltung wirklich löschen?")) {
        axiosConfig.delete(`/event/${eventId}`);

        const userData = await axiosConfig.get(
          `/user/${localStorage.getItem("userId")}`
        );

        userData.data.myEvents.map((ele, i) => {
          myEventsArray.push(ele._id);
        });
        axiosConfig.patch(`/user/${localStorage.getItem(`userId`)}`, {
          myEvents: myEventsArray.filter((e) => e !== eventId),
        });
        navigate("/profile")
      } 
    } catch (error) {
      console.log(error);
      alert("da ist etwas schief gelaufen");
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  // VA Buchen

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

  // VA Stornieren

  const handleUnsubscribe = async () => {
    try {
      let subsArr = [];
      eventData.subscribers.map((ele, i) => {
        subsArr.push(ele._id);
      });

      await axiosConfig.patch(`/event/${eventId}`, {
        subscribers: subsArr.filter((e) => {
          return e !== localStorage.getItem("userId");
        }),
        participants: parseInt(eventData.participants) + 1,
      });

      let bookedArr = [];
      const userData = await axiosConfig.get(
        `/user/${localStorage.getItem("userId")}`
      );
      console.log(userData);

      userData.data.bookedEvents.map((ele, i) => {
        bookedArr.push(ele._id);
      });

      await axiosConfig.patch(`/user/${localStorage.getItem("userId")}`, {
        bookedEvents: bookedArr.filter((e) => e !== eventId),
      });

      alert("Storno erfolgreich");
      getEventData();
    } catch (error) {
      console.log(error);
    }
  };

  // VA nicht mehr Merken/ Beobachten

  const handleUnwatchEvent = async () => {
    try {
      let watchedArr = [];
      const response = await axiosConfig.get(
        `/user/${localStorage.getItem("userId")}`
      );

      response.data.watchedEvents.map((ele, i) => {
        watchedArr.push(ele._id);
      });

      await axiosConfig.patch(`/user/${localStorage.getItem("userId")}`, {
        watchedEvents: watchedArr.filter((e) => {
          return e !== eventId;
        }),
      });

      alert("Event von der Merkliste entfernt.");
      getEventData();
    } catch (error) {
      console.log(error);
    }
  };

  // VA Merken/ Beobachten

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
      getEventData();
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
      <h3>
        {eventData.eventTitle}{" "}
        {isExpired ? <div>(Veranstaltung schon vorbei)</div> : null}
      </h3>
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
      {!isBooked ? (
        <button onClick={handleSubscribeEvent} className="button-green">
          Buchen
        </button>
      ) : (
        <button onClick={handleUnsubscribe} className="button-green">
          Stornieren
        </button>
      )}
      {!isWatched ? (
        <button onClick={handleWatchEvent} className="button-beige">
          auf meine Liste <CheckOutlined />
        </button>
      ) : (
        <button onClick={handleUnwatchEvent} className="button-beige">
          von Liste streichen <CloseOutlined />
        </button>
      )}

      {myEvent ? (
        <>
          <NavLink to={`/event-edit/${eventData._id}`} className="button-green">
            bearbeiten
          </NavLink>
          <button 
            onClick={deleteEventById}
            className="button-green"
          >
            Löschen
          </button>
        </>
      ) : null}
    </div>
  );
}
