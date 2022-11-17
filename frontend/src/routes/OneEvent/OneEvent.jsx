import React, { useEffect, useState } from "react";
import axiosConfig from "../../util/axiosConfig";

export default function OneEvent() {
  const propsEventId = "6375ffd1bc90d85b06530110"; //dummy

  const [eventData, setEventData] = useState({});

  useEffect(() => {
    const getEventById = async () => {
      const axiosResp = await axiosConfig.get(
        `http://localhost:6001/event/${propsEventId}`
      );
      const data = axiosResp.data;
      setEventData(data);
    };
    getEventById();
  }, []);

  const handleSubscribeEvent = async (id) => {
    try {
      const response = await axiosConfig.patch(
        `/event/subscribe/${propsEventId}`,
        {
          subscribers: localStorage.getItem("userId"),
        }
      );

      alert("Buchung erfolgreich!");
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleWatchEvent = async () => {
    try {
      const response = await axiosConfig.patch(
        `/user/watchedEvents/${localStorage.getItem("userId")}`,
        {
          watchedEvents: propsEventId,
        }
      );

      alert(response + "zur Merkliste hinzugefügt");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(localStorage.getItem("userId"));
  return (
    <div>
      <h3>{eventData.eventTitle}</h3>
      <p>Eventersteller: </p>
      <img src={"http://localhost:6001" + eventData.imageUrl} alt="" />
      <div>
        <h4>{eventData.category}</h4>
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
      <button onClick={handleSubscribeEvent}>Buchen</button>
      <button onClick={handleWatchEvent}>Merken</button>
    </div>
  );
}
