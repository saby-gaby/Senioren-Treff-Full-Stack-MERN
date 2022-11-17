import React, { useState } from "react";
import axiosConfig from "../../util/axiosConfig.js";

export default function EventForm() {
  const [file, setFile] = useState(null);
  const [eventTitle, setEventTitle] = useState(null);
  const [eventCategory, setCategory] = useState(null);
  const [eventDate, setDate] = useState(null);
  const [eventTime, setTime] = useState(null);
  const [eventLocation, setLocation] = useState(null);
  const [eventParticipants, setParticipants] = useState(null);
  const [eventPrice, setPrice] = useState(null);
  const [eventDescription, setDescription] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
      const formData = new FormData(e.target);
      console.log(formData);
      try {
        const response = await axiosConfig.post(
          "/event",
          {
            image: formData.get("image"),
            eventTitle: eventTitle,
            category: eventCategory,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            participants: eventParticipants,
            price: eventPrice,
            description: eventDescription,
            eventOwner: localStorage.getItem("userId")
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        alert("Event wurde erfolgreich erstellt!");
      } catch (error) {
        console.error(error);
        alert("Es ist ein Fehler aufgetreten");
      }
  };
  return (
    <div>
      {/* <Nav /> */}
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="eventForm"
      >
        <input
          type="text"
          id="eventTitle"
          name="eventTitle"
          placeholder="Event Name"
          onChange={(e) => {
            setEventTitle(e.target.value);
          }}
        />
        <select
          name="category"
          id="category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="sport">Sport</option>
          <option value="kurse">Kurse</option>
          <option value="kultur">Kultur</option>
          <option value="reisen">Reisen</option>
          <option value="natur">Natur</option>
          <option value="spiele">Spiele</option>
        </select>
        <input
          type="date"
          name="date"
          id="date"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <input
          type="time"
          name="time"
          id="time"
          placeholder="Veranstaltungsbeginn"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <input
          type="text"
          name="location"
          id="location"
          placeholder="mein Ort"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <input
          type="number"
          min="1"
          max="99"
          name="participants"
          id="participants"
          onChange={(e) => {
            setParticipants(e.target.value);
          }}
        />
        <input
          type="currency"
          name="price"
          currency="EUR"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input type="submit" value="Schicken" />
      </form>
    </div>
  );
}
