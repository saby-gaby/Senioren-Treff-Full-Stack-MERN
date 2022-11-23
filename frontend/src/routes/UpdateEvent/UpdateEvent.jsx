import React, { useState, useEffect } from "react";
import { useParams, useRef } from "react-router-dom";
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
  const [eventCategory, setEventCategory] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventParticipants, setEventParticipants] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");

  const getEventData = () => {
    const getEventById = async () => {
      const axiosResp = await axiosConfig.get(
        `http://localhost:6001/event/${id}`
      );
      const data = axiosResp.data;
      setEventData(data);
      console.log(data);
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

  const updateImage = async (e) => {
    e.preventDefault();
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
    console.log(axiosResp);
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
              onChange={(e) => setEventTitle(e.target.value)}
              id=""
            />
          )}
          {!editTitle ? (
            <EditOutlined onClick={() => setEditTitle(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditTitle(false);
                const data = { eventTitle: eventTitle };
                updateEvent(data);
              }}
            />
          )}
        </li>
        <li>
          Kategorie:{" "}
          {!editCategory ? (
            eventData.category
          ) : (
            <input
              type="text"
              onChange={(e) => setEventCategory(e.target.value)}
              id=""
            />
          )}{" "}
          {!editCategory ? (
            <EditOutlined
              onClick={() => {
                setEditCategory(true);
              }}
            />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditCategory(false);
                const data = { category: eventCategory };
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
              onChange={(e) => setEventLocation(e.target.value)}
              id=""
            />
          )}{" "}
          {!editLocation ? (
            <EditOutlined onClick={() => setEditLocation(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditLocation(false);
                const data = { location: eventLocation };
                updateEvent(data);
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
                setEditDate(false);
                const data = { date: eventDate };
                updateEvent(data);
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
              onChange={(e) => setEventTime(e.target.value)}
              id=""
            />
          )}{" "}
          {!editTime ? (
            <EditOutlined onClick={() => setEditTime(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditTime(false);
                const data = { time: eventTime };
                updateEvent(data);
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
              onChange={(e) => setEventPrice(e.target.value)}
              id=""
            />
          )}{" "}
          {!editPrice ? (
            <EditOutlined onClick={() => setEditPrice(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditPrice(false);
                const data = { price: eventPrice };
                updateEvent(data);
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
              onChange={(e) => setEventParticipants(e.target.value)}
              id=""
            />
          )}{" "}
          {!editParticipants ? (
            <EditOutlined onClick={() => setEditParticipants(true)} />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditParticipants(false);
                const data = { participants: eventParticipants };
                updateEvent(data);
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
                setEditDescription(false);
                const data = { description: eventDescription };
                updateEvent(data);
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
                onSubmit={updateImage}
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
                <button type="submit">senden</button>
              </form>
            </>
          )}
          {!editImage ? (
            <EditOutlined onClick={() => setEditImage(true)} />
          ) : null}
        </li>
      </ul>
    </div>
  );
}
