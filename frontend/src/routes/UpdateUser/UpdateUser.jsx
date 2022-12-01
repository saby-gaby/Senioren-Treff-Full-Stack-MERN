import React, { useState } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { useContext } from "react";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import axiosConfig from "../../util/axiosConfig";

export default function UpdateUser() {
  const { userData, setUserData, navigate } = useContext(SectionsContext);
  const userId = localStorage.getItem("userId");

  const [editUserName, setEditUserName] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editDisabilities, setEditDisabilities] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [disabilities, setDisabilities] = useState("");

  const getUserData = async () => {
    const axiosResp = await axiosConfig.get(
      `http://localhost:6001/user/${userId}`
    );
    const data = axiosResp.data;
    setUserData(data);
  };

  const updateUser = async (data) => {
    const axiosResp = await axiosConfig.patch(
      `/user/${localStorage.getItem("userId")}`,
      data
    );
    console.log(axiosResp);
  };

  return (
    <>
      <h1>Benutzerdaten Aktualisieren</h1>
      <ul>
        <li>
          Benutzername:{" "}
          {!editUserName ? (
            userData.userName
          ) : (
            <input
              type="text"
              defaultValue={userData.userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          )}{" "}
          {!editUserName ? (
            <EditOutlined
              onClick={() => {
                setEditUserName(true);
              }}
            />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditUserName(false);
                if (!userName) {
                  alert("Benutzername unverändert");
                } else {
                  if (confirm(`Benutzername ändern? ${userName}`)) {
                    const data = { userName: userName };
                    updateUser(data);
                    alert("Benutzername erfolgreich geändert!");
                  } else {
                    alert("Benutzername ändern abgebrochen.");
                  }
                }

                getUserData();
              }}
            />
          )}
        </li>
        <li>
          Vorname:{" "}
          {!editFirstName ? (
            userData.firstName
          ) : (
            <input
              type="text"
              defaultValue={userData.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          )}{" "}
          {!editFirstName ? (
            <EditOutlined
              onClick={() => {
                setEditFirstName(true);
              }}
            />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditFirstName(false);
                if (!firstName) {
                  alert("Vorname unverändert");
                } else {
                  if (confirm(`Vorname ändern? ${firstName}`)) {
                    const data = { firstName: firstName };
                    updateUser(data);
                    alert("Vorname erfolgreich geändert!");
                  } else {
                    alert("Vorname ändern abgebrochen.");
                  }
                }
                getUserData();
              }}
            />
          )}
        </li>
        <li>
          Nachname:{" "}
          {!editLastName ? (
            userData.lastName
          ) : (
            <input
              type="text"
              defaultValue={userData.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          )}
          {!editLastName ? (
            <EditOutlined
              onClick={() => {
                setEditLastName(true);
              }}
            />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditLastName(false);
                if (!lastName) {
                  alert("Nachname unverändert");
                } else {
                  if (confirm(`Nachname ändern? ${lastName}`)) {
                    const data = { lastName: lastName };
                    updateUser(data);
                    alert("Nachname erfolgreich geändert!");
                  } else {
                    alert("Nachname ändern abgebrochen.");
                  }
                }
                getUserData();
              }}
            />
          )}
        </li>
        <li>
          Einschränkungen:{" "}
          {!editDisabilities ? (
            userData.disabilities
          ) : (
            <input
              type="text"
              defaultValue={userData.disabilities}
              onChange={(e) => setDisabilities(e.target.value)}
            />
          )}
          {!editDisabilities ? (
            <EditOutlined
              onClick={() => {
                setEditDisabilities(true);
              }}
            />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditDisabilities(false);
                if (!disabilities) {
                  alert("Einschränkungen unverändert");
                } else {
                  if (confirm(`Einschränkungen ändern? ${disabilities}`)) {
                    const data = { disabilities: disabilities };
                    updateUser(data);
                    alert("Einschränkungen erfolgreich geändert!");
                  } else {
                    alert("Einschränkungen ändern abgebrochen.");
                  }
                }
                getUserData();
              }}
            />
          )}
        </li>
        <li>
          Wohnort:{" "}
          {!editLocation ? (
            userData.location
          ) : (
            <input
              type="text"
              defaultValue={userData.location}
              onChange={(e) => setLocation(e.target.value)}
            />
          )}
          {!editLocation ? (
            <EditOutlined
              onClick={() => {
                setEditLocation(true);
              }}
            />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditLocation(false);
                if (!location) {
                  alert("Wohnort unverändert");
                } else {
                  if (confirm(`Wohnort ändern? ${location}`)) {
                    const data = { location: location };
                    updateUser(data);
                    alert("Wohnort erfolgreich geändert!");
                    localStorage.setItem(
                      "defSearch",
                      data.location.toLowerCase()
                    );
                  } else {
                    alert("Wohnort ändern abgebrochen.");
                  }
                }
                getUserData();
              }}
            />
          )}
        </li>
        <li>
          Email:{" "}
          {!editEmail ? (
            userData.email
          ) : (
            <input
              type="text"
              defaultValue={userData.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}{" "}
          {!editEmail ? (
            <EditOutlined
              onClick={() => {
                setEditEmail(true);
              }}
            />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditEmail(false);
                if (!email) {
                  alert("Email unverändert");
                } else {
                  if (confirm(`Email ändern? ${email}`)) {
                    const data = { email: email };
                    updateUser(data);
                    alert("Email erfolgreich geändert!");
                  } else {
                    alert("Email ändern abgebrochen.");
                  }
                }

                getUserData();
              }}
            />
          )}
        </li>
        <li>
          {!editPassword ? (
            <button
              className="button-green"
              onClick={() => {
                setEditPassword(true);
              }}
            >
              Passwort ändern
            </button>
          ) : (
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          {!editPassword ? null : (
            <SaveOutlined
              onClick={() => {
                setEditPassword(false);
                if (!password) {
                  alert("Passwort unverändert");
                } else {
                  if (confirm(`Passwort ändern?`)) {
                    const data = { password: password };
                    updateUser(data);
                    alert("Passwort erfolgreich geändert!");
                  } else {
                    alert("Passwort ändern abgebrochen.");
                  }
                }
                getUserData();
              }}
            />
          )}
        </li>
      </ul>
      <button onClick={() => navigate("/profile")} className="button-green">
        Fertig
      </button>
    </>
  );
}
