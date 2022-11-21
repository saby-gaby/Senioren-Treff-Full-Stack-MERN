import React, { useState } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import "./EventForm.css";

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
          eventOwner: localStorage.getItem("userId"),
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
        className="center"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="eventForm"
      >
        <label>
          Titel:
          <input
            type="text"
            id="eventTitle"
            name="eventTitle"
            placeholder="Event Name"
            onChange={(e) => {
              setEventTitle(e.target.value);
            }}
          />
        </label>
        <label>
          Kategorie:
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
        </label>
        <label>
          Ort:
          <input
            type="text"
            name="location"
            id="location"
            placeholder="mein Ort"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </label>
        <label>
          Datum:
          <input
            type="date"
            name="date"
            id="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </label>
        <label>
          Uhrzeit:
          <input
            type="time"
            name="time"
            id="time"
            placeholder="Veranstaltungsbeginn"
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
        </label>
        <label>
          Anzahl Personen:
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
        </label>
        <label>
          Beschreibung:
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </label>
        <label>
          Foto hochladen:
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <label id="button" for="image">
          Dateien durchsuchen
        </label>
        <label>
          Preis pro Person:
          <input
            type="currency"
            name="price"
            currency="EUR"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </label>
        <input id="button" type="submit" value="Erstellen" />
      </form>
    </div>
  );
}
