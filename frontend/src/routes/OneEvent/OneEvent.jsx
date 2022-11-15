import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "../../util/axiosConfig";

export default function OneEvent() {

  const propsEventId = "636e101aa6eb000e6eae0689"  //dummy
  
  const [eventData, setEventData] = useState({})

  useEffect(() => {
    const getEventById = async () => {
      const axiosResp = await axiosConfig.get(`http://localhost:6001/event/${propsEventId}`);
      const data = axiosResp.data
      setEventData(data)
    }
    getEventById()
  }, [])

  const handleSubscribeEvent = async (id) => {
    try {
      const response = await axiosConfig.patch(`/event/${propsEventId}`, {
        subscribers: localStorage.getItem("userId")
      });

      alert("Buchung erfolgreich!");
    } catch (error) {
      console.log(error);
    }
  }

  const handleWatchEvent = async () => {
    try {
      const response = await axiosConfig.patch(`/user/${localStorage.getItem("userId")}`, {
        watchedEvents: propsEventId
      });

      alert("zur Merkliste hinzugefügt");
    } catch (error) {
      console.log(error);
    }
  }

  // subscribers
  return (
    <div>
      <h3>{eventData.eventTitle}</h3>
      <img src={"http://localhost:6001" + eventData.imageUrl} alt="" />
      <div>
        <h4>{eventData.category}</h4>
        <p>{eventData.location} {new Date(eventData.date).toLocaleDateString()} {eventData.time} Uhr</p>
        <p>{eventData.price} €</p>
        <p>Teilnehmerzahl: {eventData.participants}</p>
        <div>
          <h4>Beschreibung</h4>
          <p>{eventData.description}</p>
        </div>
      </div>
      <button onClick={handleSubscribeEvent}>Buchen</button>
      <button onClick={handleWatchEvent}>Merken</button>

    </div>
  )
}
