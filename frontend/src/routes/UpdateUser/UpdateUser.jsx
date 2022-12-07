import React, { useState, useEffect } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import { useContext } from "react";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import axiosConfig from "../../util/axiosConfig";
import swal from "sweetalert";
import "./UpdateUser.css";

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
    <div className="UpdateUser">
      <h1>Benutzerdaten Aktualisieren</h1>
      <ul>
        <li>
          <span className="col1">Benutzername: </span>
          <span className="col2">
            {!editUserName ? (
              userData.userName
            ) : (
              <input
                type="text"
                defaultValue={userData.userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            )}
            <span className="col3">
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
                            const data = {
                              userName: userName,
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              gender: userData.gender,
                              disabilities: userData.disabilities,
                              email: userData.email,
                              location: userData.location,
                            };
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
            </span>
          </span>
        </li>
        <li>
          <span className="col1">Vorname: </span>
          <span className="col2">
            {!editFirstName ? (
              userData.firstName
            ) : (
              <input
                type="text"
                defaultValue={userData.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            )}
            <span className="col3"></span>
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
                          const data = {
                            userName: userData.userName,
                            firstName: firstName,
                            lastName: userData.lastName,
                            gender: userData.gender,
                            disabilities: userData.disabilities,
                            email: userData.email,
                            location: userData.location,
                          };
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
          </span>
        </li>
        <li>
          <span className="col1">Nachname: </span>
          <span className="col2">
            {!editLastName ? (
              userData.lastName
            ) : (
              <input
                type="text"
                defaultValue={userData.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            )}
            <span className="col3">
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
                            const data = {
                              userName: userData.userName,
                              firstName: userData.firstName,
                              lastName: lastName,
                              gender: userData.gender,
                              disabilities: userData.disabilities,
                              email: userData.email,
                              location: userData.location,
                            };
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
            </span>
          </span>
        </li>
        <li>
          <span className="col1">Geschlecht: </span>
          <span className="col2">
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
            )}
            <span className="col3">
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
                            const data = {
                              userName: userData.userName,
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              gender: gender,
                              disabilities: userData.disabilities,
                              email: userData.email,
                              location: userData.location,
                            };
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
            </span>
          </span>
        </li>
        <li>
          <span className="col1">Einschränkungen: </span>
          <span className="col2">
            {!editDisabilities ? (
              userData.disabilities
            ) : (
              <input
                type="text"
                defaultValue={userData.disabilities}
                onChange={(e) => setDisabilities(e.target.value)}
                className="col2"
              />
            )}
            <span className="col3">
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
                            const data = {
                              userName: userData.userName,
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              gender: userData.gender,
                              disabilities: disabilities,
                              email: userData.email,
                              location: userData.location,
                            };
                            updateUser(data);
                          });
                        } else {
                          swal({
                            title: "Einschränkungen ändern abgebrochen.",
                          });
                        }
                      });
                    }
                    getUserData();
                  }}
                />
              )}
            </span>
          </span>
        </li>
        <li>
          <span className="col1">Wohnort: </span>
          <span className="col2">
            {!editLocation ? (
              userData.location
            ) : (
              <input
                type="text"
                defaultValue={userData.location}
                onChange={(e) => setLocation(e.target.value)}
              />
            )}
            <span className="col3">
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
                            const data = {
                              userName: userData.userName,
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              gender: userData.gender,
                              disabilities: userData.disabilities,
                              email: userData.email,
                              location: location,
                            };
                            updateUser(data);
                          });
                          localStorage.setItem(
                            "defSearch",
                            location.toLowerCase()
                          );
                        } else {
                          swal({ title: "Wohnort ändern abgebrochen." });
                        }
                      });
                    }
                    getUserData();
                  }}
                />
              )}
            </span>
          </span>
        </li>
        <li>
          <span className="col1">Email: </span>
          <span className="col2">
            {!editEmail ? (
              userData.email
            ) : (
              <input
                type="text"
                defaultValue={userData.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <span className="col3">
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
                            const data = {
                              userName: userData.userName,
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              gender: userData.gender,
                              disabilities: userData.disabilities,
                              email: email,
                              location: userData.location,
                            };
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
            </span>
          </span>
        </li>
        <li>
          <span className="col1">Passwort</span>
          {!editPassword ? (
            <button
              className="button-dark-green col1"
              onClick={() => {
                setEditPassword(true);
              }}
            >
              Ändern
            </button>
          ) : (
            <input
              type="password"
              className="col1"
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <span className="col2">
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
                          const data = {
                            userName: userData.userName,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            gender: userData.gender,
                            disabilities: userData.disabilities,
                            email: userData.email,
                            location: userData.location,
                            password: password
                          };
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
          </span>
        </li>
        <button onClick={() => navigate("/profile")} className="button-green">
          Fertig
        </button>
      </ul>
    </div>
  );
}
