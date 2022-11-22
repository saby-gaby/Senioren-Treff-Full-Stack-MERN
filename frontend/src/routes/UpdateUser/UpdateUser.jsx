import React, { useState } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { useContext } from "react";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import axiosConfig from "../../util/axiosConfig";

export default function UpdateUser() {
  const { userData, setUserData } = useContext(SectionsContext);
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
    localStorage.setItem("defSearch", data.location);
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
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
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
                const data = { userName: userName };
                updateUser(data);
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
            <input type="text" onChange={(e) => setFirstName(e.target.value)} />
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
                const data = { firstName: firstName };
                updateUser(data);
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
            <input type="text" onChange={(e) => setLastName(e.target.value)} />
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
                const data = { lastName: lastName };
                updateUser(data);
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
                const data = { disabilities: disabilities };
                updateUser(data);
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
            <input type="text" onChange={(e) => setLocation(e.target.value)} />
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
                const data = { location: location };
                updateUser(data);
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
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
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
                const data = { email: email };
                updateUser(data);
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
                const data = { password: password };
                updateUser(data);
                getUserData();
              }}
            />
          )}
        </li>
      </ul>
    </>
  );
}
