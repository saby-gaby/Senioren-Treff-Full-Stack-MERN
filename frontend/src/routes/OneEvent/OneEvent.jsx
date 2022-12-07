import React, { useEffect, useState, useContext } from "react";
import axiosConfig from "../../util/axiosConfig";
import { NavLink, useParams } from "react-router-dom";
import "./OneEvent.css";
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { SectionsContext } from "../../context/sectionsContext";
import swal from "sweetalert";

export default function OneEvent() {
  const { id } = useParams();
  const eventId = id;

  const { navigate, isAuth, setBackToEvent, setInterestedEvent } =
    useContext(SectionsContext);
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
    swal({
      title: "Diese Veranstaltung wirklich löschen?",
      icon: "warning",
      buttons: ["Nein, nicht löschen!", "Ja, löschen!"],
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        swal({
          title: "Veranstaltung erfolgreich gelöscht!",
          icon: "success",
        }).then(async () => {
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
          navigate("/profile");
        });
      } else {
        swal({
          title: "Veranstaltung löschen abgebrochen.",
        });
      }
    });
  };

  useEffect(() => {
    getEventData();
    setBackToEvent(false);
  }, []);

  // VA Buchen

  const handleSubscribeEvent = async () => {
    let subsArr = [];

    eventData.subscribers.map((ele, i) => {
      subsArr.push(ele._id);
    });
    try {
      if (isAuth) {
        if (
          eventData.participants == "0" ||
          subsArr.includes(localStorage.getItem("userId"))
        ) {
          if (subsArr.includes(localStorage.getItem("userId"))) {
            swal({
              title: "du hast die Veranstaltung schon gebucht",
              button: "OK",
            });
          } else {
            swal({
              title: "leider schon ausgebucht",
              button: "OK",
            });
          }
        } else {
          await axiosConfig.patch(`/event/subscribe/${eventId}`, {
            subscribers: localStorage.getItem("userId"),
          });
          await axiosConfig.patch(`/event/${eventId}`, {
            participants: parseInt(eventData.participants) - 1,
          });
          swal({
            title: "Buchung erfolgreich!",
            button: "OK",
          });
        }
      } else {
        setBackToEvent(true);
        setInterestedEvent(eventId);
        swal({
          title: "Du musst angemeldet sein, um eine Veranstaltung zu buchen.",
          button: "OK",
        });
        navigate("/login");
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

      swal({
        title: "Storno erfolgreich",
        button: "OK",
      });
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

      swal({
        title: "Event von der Merkliste entfernt.",
        button: "OK",
      });
      getEventData();
    } catch (error) {
      console.log(error);
    }
  };

  // VA Merken/ Beobachten

  const handleWatchEvent = async () => {
    try {
      if (isAuth) {
        const response = await axiosConfig.patch(
          `/user/watchedEvents/${localStorage.getItem("userId")}`,
          {
            watchedEvents: eventId,
          }
        );
        swal({
          title: `${eventData.eventTitle} zur Merkliste von ${response.data.userName} hinzugefügt`,
          button: "OK",
        });
      } else {
        setBackToEvent(true);
        setInterestedEvent(eventId);
        swal({
          title:
            "Du musst angemeldet sein, um eine Veranstaltung auf die Merkliste zu setzen.",
          button: "OK",
        });
        navigate("/login");
      }
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
        image = "/images/default-senioren.jpg";
    }
    return image;
  };
  return (
    <div id="oneEvent">
      <h1>{eventData.eventTitle} </h1>
      {isExpired ? (
        <div className="expired">Veranstaltung schon vorbei</div>
      ) : null}

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
      <div id="eventData">
        <div id="details">
          <div>
            <h5>Veranstaltung von:</h5>
            <p>@{eventData.eventOwner && eventData.eventOwner.userName} </p>
          </div>
          <div>
            <p>{eventCategories}</p>
            <p>
              {eventData.location}{" "}
              {new Date(eventData.date).toLocaleDateString()} {eventData.time}{" "}
              Uhr
            </p>
            <p>{eventData.price} € / pro Person</p>
            <div>
              <h5>Teilnehmerzahl: </h5>
              <p>{eventData.participants}</p>
            </div>
          </div>
        </div>
        <div id="description">
          <h5>Beschreibung</h5>
          <p>{eventData.description}</p>
        </div>
        <div id="participants">
          <h5>Teilnehmer:innen</h5>
          <ul>
            {eventData.subscribers &&
              eventData.subscribers.map((ele, i) => {
                return <li key={i}>{ele.userName}</li>;
              })}
          </ul>
        </div>
      </div>
      <div id="btn">
        {!isBooked ? (
          <button
            onClick={handleSubscribeEvent}
            className="button-green btnBooked"
          >
            Buchen
          </button>
        ) : (
          <button
            onClick={handleUnsubscribe}
            className="button-green btnBooked"
          >
            Stornieren
          </button>
        )}
        <div>
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
              <NavLink
                to={`/event-edit/${eventData._id}`}
                className="button-beige"
              >
                bearbeiten
              </NavLink>
              <button onClick={deleteEventById} className="button-beige">
                Löschen
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
