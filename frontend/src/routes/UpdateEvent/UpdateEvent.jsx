import React, { useState, useEffect } from "react";
import { NavLink, useParams, useRef } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

export default function UpdateEvent() {
  const { id } = useParams();
  const [refreshData, setRefreshData] = useState({});
  const [eventData, setEventData] = useState({});
  const [editTitle, setEditTitle] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editDate, setEditDate] = useState(false);
  const [editTime, setEditTime] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [editParticipants, setEditParticipants] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const [eventTitle, setEventTitle] = useState("");
  const [eventCategory, setEventCategory] = useState({ categories: [] });
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventParticipants, setEventParticipants] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");

  const [editProgress, setEditProgress] = useState(false);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const { categories } = eventCategory;
    if (checked) {
      setEventCategory({ categories: [...categories, value] });
    } else {
      setEventCategory({ categories: categories.filter((e) => e !== value) });
    }
  };

  const getEventData = () => {
    const getEventById = async () => {
      const axiosResp = await axiosConfig.get(
        `http://localhost:6001/event/${id}`
      );
      const data = axiosResp.data;
      setEventData(data);
    };
    getEventById();
  };

  useEffect(() => {
    getEventData();
  }, []);

  const updateEvent = async (ele) => {
    const axiosResp = await axiosConfig.patch(`/event/${id}`, ele);

    setRefreshData(axiosResp.data);
    refreshData ? getEventData() : getEventData();
    return console.log(axiosResp.data);
  };

  const updateImage = async () => {
    const formData = new FormData(e.target);
    console.log(formData);
    const axiosResp = await axiosConfig.patch(
      `/event/${id}`,
      {
        image: formData.get("image"),
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setEditImage(false);
    setRefreshData(axiosResp.data);
    refreshData ? getEventData() : getEventData();
  };

  return (
    <div>
      <h1>Veranstaltung bearbeiten</h1>
      <ul>
        <li>
          Titel:{" "}
          {!editTitle ? (
            eventData.eventTitle
          ) : (
            <input
              type="text"
              defaultValue={eventData.eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              id=""
            />
          )}
          {!editTitle ? (
            <EditOutlined onClick={() => setEditTitle(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                if (!eventTitle) {
                  alert("Veranstaltungstitel unverändert");
                } else {
                  if (confirm(`Veranstaltungstitel ändern? ${eventTitle}`)) {
                    const data = { eventTitle: eventTitle };
                    updateEvent(data);
                    setEditProgress(true);
                    alert("Veranstaltungstitel erfolgreich geändert!");
                  } else {
                    alert("Veranstaltungstitel ändern abgebrochen.");
                  }
                }
                setEditTitle(false);
              }}
            />
          )}
        </li>
        <li>
          Kategorie:{" "}
          {!editCategory ? (
            eventData.category
          ) : (
            <>
              <fieldset>
                <legend>wähle deine Kategorien</legend>
                <div>
                  <input
                    type="checkbox"
                    id="sport"
                    name="sport"
                    value="sport"
                    onChange={handleChange}
                  />
                  <label htmlFor="sport">Sport</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="kurse"
                    name="kurse"
                    value="kurse"
                    onChange={handleChange}
                  />
                  <label htmlFor="kurse">Kurse</label>
                </div>

                <div>
                  <input
                    type="checkbox"
                    id="kultur"
                    name="kultur"
                    value="kultur"
                    onChange={handleChange}
                  />
                  <label htmlFor="kultur">Kultur</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="reisen"
                    name="reisen"
                    value="reisen"
                    onChange={handleChange}
                  />
                  <label htmlFor="reisen">Reisen</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="natur"
                    name="natur"
                    value="natur"
                    onChange={handleChange}
                  />
                  <label htmlFor="natur">Natur</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="spiele"
                    name="spiele"
                    value="spiele"
                    onChange={handleChange}
                  />
                  <label htmlFor="spiele">Spiele</label>
                </div>
              </fieldset>
            </>
          )}
          {!editCategory ? (
            <EditOutlined
              onClick={() => {
                setEditCategory(true);
              }}
            />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditProgress(true);
                setEditCategory(false);
                const data = { category: eventCategory.categories };
                updateEvent(data);
              }}
            />
          )}
        </li>
        <li>
          Ort:{" "}
          {!editLocation ? (
            eventData.location
          ) : (
            <input
              type="text"
              defaultValue={eventData.location}
              onChange={(e) => setEventLocation(e.target.value)}
              id=""
            />
          )}{" "}
          {!editLocation ? (
            <EditOutlined onClick={() => setEditLocation(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                if (!eventLocation) {
                  alert("Ort unverändert");
                } else {
                  if (confirm(`Ort ändern? ${eventLocation}`)) {
                    setEditProgress(true);
                    const data = { location: eventLocation };
                    updateEvent(data);
                    alert("Ort erfolgreich geändert!");
                  } else {
                    alert("Ort ändern abgebrochen.");
                  }
                }
                setEditLocation(false);
              }}
            />
          )}
        </li>
        <li>
          Datum:{" "}
          {!editDate ? (
            new Date(eventData.date).toLocaleDateString()
          ) : (
            <input
              type="date"
              onChange={(e) => setEventDate(e.target.value)}
              id=""
            />
          )}
          {!editDate ? (
            <EditOutlined onClick={() => setEditDate(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                if (!eventDate) {
                  alert("Datum unverändert");
                } else {
                  if (confirm(`Datum ändern? ${eventDate}`)) {
                    setEditProgress(true);
                    const data = { date: eventDate };
                    updateEvent(data);
                    alert("Datum erfolgreich geändert!");
                  } else {
                    alert("Datum ändern abgebrochen.");
                  }
                }
                setEditDate(false);
              }}
            />
          )}
        </li>
        <li>
          Uhrzeit:{" "}
          {!editTime ? (
            eventData.time
          ) : (
            <input
              type="time"
              defaultValue={eventData.time}
              onChange={(e) => setEventTime(e.target.value)}
              id=""
            />
          )}{" "}
          {!editTime ? (
            <EditOutlined onClick={() => setEditTime(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                if (!eventTime) {
                  alert("Uhrzeit unverändert");
                } else {
                  if (confirm(`Uhrzeit ändern? ${eventTime}`)) {
                    setEditProgress(true);
                    const data = { time: eventTime };
                    updateEvent(data);
                    alert("Uhrzeit erfolgreich geändert!");
                  } else {
                    alert("Uhrzeit ändern abgebrochen.");
                  }
                }
                setEditTime(false);
              }}
            />
          )}
        </li>
        <li>
          Preis:{" "}
          {!editPrice ? (
            eventData.price
          ) : (
            <input
              type="currency"
              defaultValue={eventData.price}
              onChange={(e) => setEventPrice(e.target.value)}
              id=""
            />
          )}{" "}
          {!editPrice ? (
            <EditOutlined onClick={() => setEditPrice(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                if (!eventPrice) {
                  alert("Preis unverändert");
                } else {
                  if (confirm(`Preis ändern? ${eventPrice}`)) {
                    setEditProgress(true);
                    const data = { price: eventPrice };
                    updateEvent(data);
                    alert("Preis erfolgreich geändert!");
                  } else {
                    alert("Preis ändern abgebrochen.");
                  }
                }
                setEditPrice(false);
              }}
            />
          )}
        </li>
        <li>
          Teilnehmerzahl:{" "}
          {!editParticipants ? (
            eventData.participants
          ) : (
            <input
              type="number"
              min="1"
              max="99"
              defaultValue={eventData.participants}
              onChange={(e) => setEventParticipants(e.target.value)}
              id=""
            />
          )}{" "}
          {!editParticipants ? (
            <EditOutlined onClick={() => setEditParticipants(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                if (!eventParticipants) {
                  alert("Teilnehmerzahl unverändert");
                } else {
                  if (confirm(`Teilnehmerzahl ändern? ${eventParticipants}`)) {
                    setEditProgress(true);
                    const data = { participants: eventParticipants };
                    updateEvent(data);
                    alert("Teilnehmerzahl erfolgreich geändert!");
                  } else {
                    alert("Teilnehmerzahl ändern abgebrochen.");
                  }
                }
                setEditParticipants(false);
              }}
            />
          )}
        </li>
        <li>
          Beschreibung:{" "}
          {!editDescription ? (
            eventData.description
          ) : (
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              defaultValue={eventData.description}
              onChange={(e) => {
                setEventDescription(e.target.value);
              }}
            ></textarea>
          )}{" "}
          {!editDescription ? (
            <EditOutlined onClick={() => setEditDescription(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                if (!eventDescription) {
                  alert("Beschreibung unverändert");
                } else {
                  if (confirm(`Beschreibung ändern? ${eventDescription}`)) {
                    setEditProgress(true);
                    const data = { description: eventDescription };
                    updateEvent(data);
                    alert("Beschreibung erfolgreich geändert!");
                  } else {
                    alert("Beschreibung ändern abgebrochen.");
                  }
                }
                setEditDescription(false);
              }}
            />
          )}
        </li>
        <li>
          Bild:
          {!editImage ? (
            <img src={`http://localhost:6001${eventData.imageUrl}`} alt="" />
          ) : (
            <>
              <form
                action=""
                onSubmit={() => {
                  if (!eventImage) {
                    alert("Bild unverändert");
                  } else {
                    if (confirm(`Bild ändern? ${eventImage.name}`)) {
                      updateImage();
                      alert("Bild erfolgreich geändert!");
                    } else {
                      alert("Bild ändern abgebrochen.");
                    }
                  }
                }}
                encType="multipart/form-data"
              >
                <label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => setEventImage(e.target.files[0])}
                  />
                </label>
                <label className="button-beige" htmlFor="image">
                  Dateien durchsuchen
                </label>
                <button type="submit" className="button-green">
                  Bild Speichern
                </button>
              </form>
            </>
          )}
          {!editImage ? (
            <EditOutlined
              onClick={() => {
                setEditImage(true);
              }}
            />
          ) : null}
        </li>
        <div>
          {!editProgress ? (
            <NavLink to={`/event/${eventData._id}`} className="button-green">
              Abbrechen
            </NavLink>
          ) : (
            <NavLink to={`/event/${eventData._id}`} className="button-green">
              Fertig
            </NavLink>
          )}
        </div>
      </ul>
    </div>
  );
}
