import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useRef } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import "./UpdateEvent.css";
import { SectionsContext } from "../../context/sectionsContext";

export default function UpdateEvent() {
  const {capitalize}=useContext(SectionsContext)
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

  const [spiele, setSpiele] = useState(false);
  const [reisen, setReisen] = useState(false);
  const [sport, setSport] = useState(false);
  const [kultur, setKultur] = useState(false);
  const [kurse, setKurse] = useState(false);
  const [natur, setNatur] = useState(false);

  const [capitalisedLocations, setCapitalisedLocations] = useState([]);

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

      // Kapitalisieren Location-Array
      let arr = [];
      data.location.forEach((loc) => {
        arr.push(capitalize(loc));
      });
      setCapitalisedLocations(arr);

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
  };

  return (
    <div className="UpdateEvent">
      <h1>Veranstaltung bearbeiten</h1>
      <div className="editEvent">
        <ul>
          <li>
            <span className="col1">Titel:</span>
            <span className="col2">
              {!editTitle ? (
                <span>{eventData.eventTitle}</span>
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
                      swal({ title: "Titel unverändert!" });
                    } else {
                      swal({
                        title: "Titel ändern?",
                        text: eventTitle,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          swal({
                            title: "Titel erfolgreich geändert!!",
                            text: eventTitle,
                            icon: "success",
                          }).then(() => {
                            const data = { eventTitle: eventTitle };
                            updateEvent(data);
                            setEditProgress(true);
                          });
                        } else {
                          swal({
                            title: "Titel ändern abgebrochen.",
                          });
                        }
                      });
                    }
                    setEditTitle(false);
                  }}
                />
              )}
            </span>
          </li>
          <li>
            <span className="col1">Kategorie:</span>
            <span className="col2 category">
              {!editCategory ? (
                <span>{eventData.category}</span>
              ) : (
                <>
                  <fieldset>
                    <legend>Wähle deine Kategorien</legend>
                    <div>
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
                      <label
                        htmlFor="sport"
                        className={sport ? "button-dark-green" : "button-beige"}
                      >
                        Sport
                      </label>
                    </div>
  
                    <div>
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
                      <label
                        htmlFor="kurse"
                        className={kurse ? "button-dark-green" : "button-beige"}
                      >
                        Kurse
                      </label>
                    </div>
  
                    <div>
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
                      <label
                        htmlFor="kultur"
                        className={kultur ? "button-dark-green" : "button-beige"}
                      >
                        Kultur
                      </label>
                    </div>
                    <div>
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
                      <label
                        htmlFor="reisen"
                        className={reisen ? "button-dark-green" : "button-beige"}
                      >
                        Reisen
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="natur"
                        name="natur"
                        value="natur"
                        onChange={(e) => {
                          handleChange;
                          setNatur(!natur)
                        }}
                      />
                      <label htmlFor="natur" className={natur ? "button-dark-green" : "button-beige"}>Natur</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="spiele"
                        name="spiele"
                        value="spiele"
                        onChange={(e)=>{
                          handleChange(e);
                          setSpiele(!spiele)
                        }}
                      />
                      <label htmlFor="spiele" className={spiele ? "button-dark-green" : "button-beige"}>Spiele</label>
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
                    swal({
                      title: "Kategorie ändern?",
                      text: eventCategory.categories.join(", "),
                      icon: "warning",
                      buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                      dangerMode: true,
                    }).then((isConfirm) => {
                      if (isConfirm) {
                        swal({
                          title: "Kategorie erfolgreich geändert!!",
                          text: eventCategory.categories.join(", "),
                          icon: "success",
                        }).then(() => {
                          const data = { category: eventCategory.categories };
                          updateEvent(data);
                          setEditProgress(true);
                          location.reload();
                        });
                      } else {
                        swal({
                          title: "Kategorie ändern abgebrochen.",
                        });
                      }
                    });
                    setEditCategory(false);
                  }}
                />
              )}
            </span>
          </li>
          <li>
            <span className="col1">Ort:</span>
            <span className="col2">
              {!editLocation ? (
                <span>{capitalisedLocations.join(", ")}</span>
              ) : (
                <input
                  type="text"
                  defaultValue={eventData.location}
                  onChange={(e) => setEventLocation(e.target.value)}
                  id=""
                />
              )}
              {!editLocation ? (
                <EditOutlined onClick={() => setEditLocation(true)} />
              ) : (
                <SaveOutlined
                  onClick={() => {
                    if (!eventLocation) {
                      swal({ title: "Ort unverändert!" });
                    } else {
                      swal({
                        title: "Ort ändern?",
                        text: eventLocation,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          swal({
                            title: "Ort erfolgreich geändert!!",
                            text: eventLocation,
                            icon: "success",
                          }).then(() => {
                            const data = { location: eventLocation };
                            updateEvent(data);
                            setEditProgress(true);
                          });
                        } else {
                          swal({
                            title: "Ort ändern abgebrochen.",
                          });
                        }
                      });
                    }
                    setEditLocation(false);
                  }}
                />
              )}
            </span>
          </li>
          <li>
            <span className="col1">Datum:</span>
            <span className="col2">
              {!editDate ? (
                <span>{new Date(eventData.date).toLocaleDateString()}</span>
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
                      swal({ title: "Datum unverändert!" });
                    } else {
                      swal({
                        title: "Datum ändern?",
                        text: eventDate,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          swal({
                            title: "Datum erfolgreich geändert!!",
                            text: eventDate,
                            icon: "success",
                          }).then(() => {
                            const data = { date: eventDate };
                            updateEvent(data);
                            setEditProgress(true);
                          });
                        } else {
                          swal({
                            title: "Datum ändern abgebrochen.",
                          });
                        }
                      });
                    }
                    setEditDate(false);
                  }}
                />
              )}
            </span>
          </li>
          <li>
            <span className="col1">Uhrzeit:</span>
            <span className="col2">
              {!editTime ? (
                <span>{eventData.time}</span>
              ) : (
                <input
                  type="time"
                  defaultValue={eventData.time}
                  onChange={(e) => setEventTime(e.target.value)}
                  id=""
                />
              )}
              {!editTime ? (
                <EditOutlined onClick={() => setEditTime(true)} />
              ) : (
                <SaveOutlined
                  onClick={() => {
                    if (!eventTime) {
                      swal({ title: "Uhrzeit unverändert!" });
                    } else {
                      swal({
                        title: "Uhrzeit ändern?",
                        text: eventTime,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          swal({
                            title: "Uhrzeit erfolgreich geändert!!",
                            text: eventTime,
                            icon: "success",
                          }).then(() => {
                            const data = { time: eventTime };
                            updateEvent(data);
                            setEditProgress(true);
                          });
                        } else {
                          swal({
                            title: "Uhrzeit ändern abgebrochen.",
                          });
                        }
                      });
                    }
                    setEditTime(false);
                  }}
                />
              )}
            </span>
          </li>
          <li>
            <span className="col1">Preis:</span>
            <span className="col2">
              {!editPrice ? (
                <span>{eventData.price}</span>
              ) : (
                <input
                  type="currency"
                  defaultValue={eventData.price}
                  onChange={(e) => setEventPrice(e.target.value)}
                  id=""
                />
              )}
              {!editPrice ? (
                <EditOutlined onClick={() => setEditPrice(true)} />
              ) : (
                <SaveOutlined
                  onClick={() => {
                    if (!eventPrice) {
                      swal({ title: "Preis unverändert!" });
                    } else {
                      swal({
                        title: "Preis ändern?",
                        text: eventPrice,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          swal({
                            title: "Preis erfolgreich geändert!!",
                            text: eventPrice,
                            icon: "success",
                          }).then(() => {
                            const data = { price: eventPrice };
                            updateEvent(data);
                            setEditProgress(true);
                          });
                        } else {
                          swal({
                            title: "Preis ändern abgebrochen.",
                          });
                        }
                      });
                    }
                    setEditPrice(false);
                  }}
                />
              )}
            </span>
          </li>
          <li>
            <span className="col1">Verfügbare Plätze:</span>
            <span className="col2">
              {!editParticipants ? (
                <span>{eventData.participants}</span>
              ) : (
                <input
                  type="number"
                  min="1"
                  max="99"
                  defaultValue={eventData.participants}
                  onChange={(e) => setEventParticipants(e.target.value)}
                  id=""
                />
              )}
              {!editParticipants ? (
                <EditOutlined onClick={() => setEditParticipants(true)} />
              ) : (
                <SaveOutlined
                  onClick={() => {
                    if (!eventParticipants) {
                      swal({ title: "Teilnehmerzahl unverändert!" });
                    } else {
                      swal({
                        title: "Teilnehmerzahl ändern?",
                        text: eventParticipants,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          swal({
                            title: "Teilnehmerzahl erfolgreich geändert!!",
                            text: eventParticipants,
                            icon: "success",
                          }).then(() => {
                            const data = { participants: eventParticipants };
                            updateEvent(data);
                            setEditProgress(true);
                          });
                        } else {
                          swal({
                            title: "Teilnehmerzahl ändern abgebrochen.",
                          });
                        }
                      });
                    }
                    setEditParticipants(false);
                  }}
                />
              )}
            </span>
          </li>
          <li>
            <span className="col1">Beschreibung:</span>
            <span className="col2">
              {!editDescription ? (
                <span className="description">{eventData.description}</span>
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
              )}
              {!editDescription ? (
                <EditOutlined onClick={() => setEditDescription(true)} />
              ) : (
                <SaveOutlined
                  onClick={() => {
                    if (!eventDescription) {
                      swal({ title: "Beschreibung unverändert!" });
                    } else {
                      swal({
                        title: "Beschreibung ändern?",
                        text: eventDescription,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          swal({
                            title: "Beschreibung erfolgreich geändert!!",
                            text: eventDescription,
                            icon: "success",
                          }).then(() => {
                            const data = { description: eventDescription };
                            updateEvent(data);
                            setEditProgress(true);
                          });
                        } else {
                          swal({
                            title: "Beschreibung ändern abgebrochen.",
                          });
                        }
                      });
                    }
                    setEditDescription(false);
                  }}
                />
              )}
            </span>
          </li>
          <li>
            <span className="col1">Bild:</span>
            <span className="col2">
              {!editImage ? (
                <img src={`http://localhost:6001${eventData.imageUrl}`} alt="" />
              ) : (
                <>
                  <form
                    action=""
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!eventImage) {
                        swal({ title: "Bild unverändert!" }).then(() => {
                          location.reload();
                        });
                      } else {
                        swal({
                          title: "Bild ändern?",
                          text: eventImage.name,
                          icon: "warning",
                          buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                          dangerMode: true,
                        }).then((isConfirm) => {
                          if (isConfirm) {
                            swal({
                              title: "Bild erfolgreich geändert!!",
                              text: eventImage.name,
                              icon: "success",
                            }).then(() => {
                              updateImage(e);
                              setEditProgress(true);
                            });
                          } else {
                            swal({
                              title: "Bild ändern abgebrochen.",
                            }).then(() => {
                              location.reload();
                            });
                          }
                        });
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
            </span>
          </li>
        </ul>
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
      </div>
    </div>
  );
}
