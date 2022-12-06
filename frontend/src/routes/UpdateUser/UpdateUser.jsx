import React, { useState, useEffect } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { useContext } from "react";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import axiosConfig from "../../util/axiosConfig";
import swal from "sweetalert";

export default function UpdateUser() {
  const { userData, setUserData, navigate } = useContext(SectionsContext);
  const userId = localStorage.getItem("userId");

  const [refreshData, setRefreshData] = useState({});
  const [editUserName, setEditUserName] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editDisabilities, setEditDisabilities] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [editGender, setEditGender] = useState(false);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [disabilities, setDisabilities] = useState("");
  const [gender, setGender] = useState("");
  const [genderName, setGenderName] = useState("");

  const getUserData = () => {
    const getUserbyId = async () => {
      const axiosResp = await axiosConfig.get(
        `http://localhost:6001/user/${userId}`
      );
      const data = axiosResp.data;
      setUserData(data);
    };
    getUserbyId();
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateUser = async (data) => {
    const axiosResp = await axiosConfig.patch(
      `/user/${localStorage.getItem("userId")}`,
      data
    );
    setRefreshData(axiosResp.data);
    refreshData ? getUserData() : getUserData();
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
                  swal({ title: "Benutzername unverändert!" });
                } else {
                  swal({
                    title: "Benutzername ändern?",
                    text: userName,
                    icon: "warning",
                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                    dangerMode: true,
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      swal({
                        title: "Benutzername erfolgreich geändert!!",
                        text: userName,
                        icon: "success",
                      }).then(() => {
                        const data = { userName: userName };
                        updateUser(data);
                      });
                    } else {
                      swal({ title: "Benutzername ändern abgebrochen." });
                    }
                  });
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
                  swal({ title: "Vorname unverändert!" });
                } else {
                  swal({
                    title: "Vorname ändern?",
                    text: firstName,
                    icon: "warning",
                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                    dangerMode: true,
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      swal({
                        title: "Vorname erfolgreich geändert!!",
                        text: firstName,
                        icon: "success",
                      }).then(() => {
                        const data = { firstName: firstName };
                        updateUser(data);
                      });
                    } else {
                      swal({ title: "Vorname ändern abgebrochen." });
                    }
                  });
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
                  swal({ title: "Nachname unverändert!" });
                } else {
                  swal({
                    title: "Nachname ändern?",
                    text: lastName,
                    icon: "warning",
                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                    dangerMode: true,
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      swal({
                        title: "Nachname erfolgreich geändert!!",
                        text: lastName,
                        icon: "success",
                      }).then(() => {
                        const data = { lastName: lastName };
                        updateUser(data);
                      });
                    } else {
                      swal({ title: "Nachname ändern abgebrochen." });
                    }
                  });
                }
                getUserData();
              }}
            />
          )}
        </li>
        <li>
          Geschlecht:{" "}
          {!editGender ? (
            userData.gender
          ) : (
            <select
              defaultValue={userData.gender}
              onChange={(e) => {
                setGender(e.target.value);
                switch (e.target.value) {
                  case "female":
                    setGenderName("Weiblich");
                    break;
                  case "male":
                    setGenderName("Männlich");
                    break;
                  case "diverse":
                    setGenderName("Nicht binär");
                    break;
                  default:
                    setGenderName("keine Angabe");
                }
              }}
            >
              <option value="">-----</option>
              <option value="female">Frau</option>
              <option value="male">Mann</option>
              <option value="diverse">nicht binär</option>
              <option value="none">keine Angabe</option>
            </select>
          )}{" "}
          {!editGender ? (
            <EditOutlined
              onClick={() => {
                setEditGender(true);
              }}
            />
          ) : (
            <SaveOutlined
              onClick={() => {
                setEditGender(false);
                if (!gender) {
                  swal({ title: "Geschlecht unverändert!" });
                } else {
                  swal({
                    title: "Geschlecht ändern?",
                    text: genderName,
                    icon: "warning",
                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                    dangerMode: true,
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      swal({
                        title: "Geschlecht erfolgreich geändert!!",
                        text: genderName,
                        icon: "success",
                      }).then(() => {
                        const data = { gender: gender };
                        updateUser(data);
                      });
                    } else {
                      swal({ title: "Geschlecht ändern abgebrochen." });
                    }
                  });
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
                  swal({ title: "Einschränkungen unverändert!" });
                } else {
                  swal({
                    title: "Einschränkungen ändern?",
                    text: disabilities,
                    icon: "warning",
                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                    dangerMode: true,
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      swal({
                        title: "Einschränkungen erfolgreich geändert!!",
                        text: disabilities,
                        icon: "success",
                      }).then(() => {
                        const data = { disabilities: disabilities };
                        updateUser(data);
                      });
                    } else {
                      swal({ title: "Einschränkungen ändern abgebrochen." });
                    }
                  });
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
                  swal({ title: "Wohnort unverändert!" });
                } else {
                  swal({
                    title: "Wohnort ändern?",
                    text: location,
                    icon: "warning",
                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                    dangerMode: true,
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      swal({
                        title: "Wohnort erfolgreich geändert!!",
                        text: location,
                        icon: "success",
                      }).then(() => {
                        const data = { location: location };
                        updateUser(data);
                      });
                      localStorage.setItem("defSearch", location.toLowerCase())
                    } else {
                      swal({ title: "Wohnort ändern abgebrochen." });
                    }
                  });
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
                  swal({ title: "Email unverändert!" });
                } else {
                  swal({
                    title: "Email ändern?",
                    text: email,
                    icon: "warning",
                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                    dangerMode: true,
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      swal({
                        title: "Email erfolgreich geändert!!",
                        text: email,
                        icon: "success",
                      }).then(() => {
                        const data = { email: email };
                        updateUser(data);
                      });
                    } else {
                      swal({ title: "Email ändern abgebrochen." });
                    }
                  });
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
                  swal({ title: "Passwort unverändert!" });
                } else {
                  swal({
                    title: "Passwort ändern?",
                    icon: "warning",
                    buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                    dangerMode: true,
                  }).then((isConfirm) => {
                    if (isConfirm) {
                      swal({
                        title: "Passwort erfolgreich geändert!!",
                        icon: "success",
                      }).then(() => {
                        const data = { password: password };
                        updateUser(data);
                      });
                    } else {
                      swal({ title: "Passwort ändern abgebrochen." });
                    }
                  });
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
