import React, { useContext, useState } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import "./EventForm.css";
import { SectionsContext } from "../../context/sectionsContext.js";
import swal from "sweetalert";

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

  const [spiele, setSpiele] = useState(false);
  const [reisen, setReisen] = useState(false);
  const [sport, setSport] = useState(false);
  const [kultur, setKultur] = useState(false);
  const [kurse, setKurse] = useState(false);
  const [natur, setNatur] = useState(false);

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

      swal({
        title: "Event wurde erfolgreich erstellt!",
        button: "OK",
      }).then(() => {
        navigate(`/event/${response.data._id}`);
      });
    } catch (error) {
      console.error(error);
      swal({
        title: "Es ist ein Fehler aufgetreten",
        button: "OK",
      });
    }
  };

  return (
    <div className="EventForm">
      <h1 id="eventFormH1">Veranstaltung erstellen</h1>
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
              <label
                htmlFor="sport"
                className={sport ? "button-dark-green" : "button-beige"}
              >
                <input
                  type="checkbox"
                  id="sport"
                  name="sport"
                  value="sport"
                  onChange={(e) => {
                    handleChange(e);
                    setSport(!sport);
                  }}
                />
                Sport
              </label>
            </div>

            <div className="checks">
              <label
                htmlFor="kurse"
                className={kurse ? "button-dark-green" : "button-beige"}
              >
                <input
                  type="checkbox"
                  id="kurse"
                  name="kurse"
                  value="kurse"
                  onChange={(e) => {
                    handleChange(e);
                    setKurse(!kurse);
                  }}
                />
                Kurse
              </label>
            </div>

            <div className="checks">
              <label
                htmlFor="kultur"
                className={kultur ? "button-dark-green" : "button-beige"}
              >
                <input
                  type="checkbox"
                  id="kultur"
                  name="kultur"
                  value="kultur"
                  onChange={(e) => {
                    handleChange(e);
                    setKultur(!kultur);
                  }}
                />
                Kultur
              </label>
            </div>
            <div className="checks">
              <label
                htmlFor="reisen"
                className={reisen ? "button-dark-green" : "button-beige"}
              >
                <input
                  type="checkbox"
                  id="reisen"
                  name="reisen"
                  value="reisen"
                  onChange={(e) => {
                    handleChange(e);
                    setReisen(!reisen);
                  }}
                />
                Reisen
              </label>
            </div>
            <div className="checks">
              <label
                htmlFor="natur"
                className={natur ? "button-dark-green" : "button-beige"}
              >
                <input
                  type="checkbox"
                  id="natur"
                  name="natur"
                  value="natur"
                  onChange={(e) => {
                    handleChange(e);
                    setNatur(!natur);
                  }}
                />{" "}
                Natur
              </label>
            </div>
            <div className="checks">
              <label
                htmlFor="spiele"
                className={spiele ? `button-dark-green` : `button-beige`}
              >
                <input
                  type="checkbox"
                  id="spiele"
                  name="spiele"
                  value="spiele"
                  onChange={(e) => {
                    handleChange(e);
                    setSpiele(!spiele);
                  }}
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
          <input id="Green-Special" type="submit" value="Erstellen" />
        </form>
      </div>
    </div>
  );
}
