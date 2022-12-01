import React, { useContext, useState } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import "./EventForm.css";
import { SectionsContext } from "../../context/sectionsContext.js";

export default function EventForm() {
  const [file, setFile] = useState(null);
  const [eventTitle, setEventTitle] = useState(null);
  const [eventCategory, setEventCategory] = useState({ categories: [] });
  const [eventDate, setDate] = useState(null);
  const [eventTime, setTime] = useState(null);
  const [eventLocation, setLocation] = useState(null);
  const [eventParticipants, setParticipants] = useState(null);
  const [eventPrice, setPrice] = useState(null);
  const [eventDescription, setDescription] = useState(null);
  const { navigate } = useContext(SectionsContext);

  const [checkedSpiele, setCheckedSpiele] = useState(false);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const { categories } = eventCategory;
    if (checked) {
      setEventCategory({ categories: [...categories, value] });
    } else {
      setEventCategory({ categories: categories.filter((e) => e !== value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.debug(eventCategory);
    try {
      const response = await axiosConfig.post(
        "/event",
        {
          image: formData.get("image"),
          eventTitle: eventTitle,
          category: JSON.stringify(eventCategory.categories),
          date: eventDate,
          time: eventTime,
          location: JSON.stringify(eventLocation),
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

      console.log("reponsData", response.data);
      alert("Event wurde erfolgreich erstellt!");
      navigate(`/event/${response._id}`);
    } catch (error) {
      console.error(error);
      alert("Es ist ein Fehler aufgetreten");
    }
  };

  return (
    <>
      <h1>Veranstaltung erstellen</h1>
      <div id="formWrapper">
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
          <fieldset id="categoryChecks">
            <legend>Veranstaltungs - Kategorien: </legend>
            <div className="checks">
              <label htmlFor="sport" className="button-green">
                <input
                  type="checkbox"
                  id="sport"
                  name="sport"
                  value="sport"
                  onChange={handleChange}
                />
                Sport
              </label>
            </div>

            <div className="checks">
              <label htmlFor="kurse" className="button-green">
                <input
                  type="checkbox"
                  id="kurse"
                  name="kurse"
                  value="kurse"
                  onChange={handleChange}
                />
                Kurse
              </label>
            </div>

            <div className="checks">
              <label htmlFor="kultur" className="button-green">
                <input
                  type="checkbox"
                  id="kultur"
                  name="kultur"
                  value="kultur"
                  onChange={handleChange}
                />
                Kultur
              </label>
            </div>
            <div className="checks">
              <label htmlFor="reisen" className="button-green">
                <input
                  type="checkbox"
                  id="reisen"
                  name="reisen"
                  value="reisen"
                  onChange={handleChange}
                />
                Reisen
              </label>
            </div>
            <div className="checks">
              <label htmlFor="natur" className="button-green">
                <input
                  type="checkbox"
                  id="natur"
                  name="natur"
                  value="natur"
                  onChange={handleChange}
                />{" "}
                Natur
              </label>
            </div>
            <div className="checks">
              <label
                htmlFor="spiele"
                className={
                  checkedSpiele ? `button-green checked` : `button-green `
                }
              >
                <input
                  type="checkbox"
                  id="spiele"
                  name="spiele"
                  value="spiele"
                  onChange={handleChange}
                />{" "}
                Spiele
              </label>
            </div>
          </fieldset>
          <label>
            Ort:
            <input
              type="text"
              name="location"
              id="location"
              placeholder="mein Ort"
              onChange={(e) => {
                const valuesArray = e.target.value.split(",");
                setLocation(valuesArray);
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
              cols="45"
              rows="25"
              placeholder="Beschreibung..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </label>
          <div id="upload">
            <label>
              Foto hochladen:
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <label className="button-beige" htmlFor="image">
              Dateien durchsuchen
            </label>
          </div>
          <label>
            Preis pro Person:
            <input
              type="currency"
              name="price"
              currency="EUR"
              placeholder="in EUR"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </label>
          <input className="button-green" type="submit" value="Erstellen" />
        </form>
      </div>
    </>
  );
}
