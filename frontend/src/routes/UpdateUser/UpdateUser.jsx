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

  const [editInputName, setEditInputName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const genderRender = () => {
    let gender;
    switch (userData.gender) {
      case "female":
        gender = "weiblich";
        break;
      case "male":
        gender = "männlich";
        break;
      case "diverse":
        gender = "nicht Binär";
        break;
      case "none":
        gender = "keine Angabe";
        break;
    }

    return gender;
  };

  const getUserData = () => {
    const getUserById = async () => {
      const axiosResp = await axiosConfig.get(
        `http://localhost:6001/user/${userId}`
      );
      const data = axiosResp.data;
      setUserData(data);
    };
    getUserById();
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleErrorMessage = (data) => {
    switch (data) {
      case "Benutzername":
        setErrorMessage(
          "Ihr Benutzername muss zwischen 4 und 20 Zeichen lang sein"
        );
        break;
      case "Email":
        setErrorMessage("Geben Sie bitte eine gültige Email-Adresse ein");
        break;
      case "Passwort":
        setErrorMessage(
          "Ihr Passwort muss mindestens 8 Zeichen lang sein und eine Zahl, einen Groß- und einen Kleinbuchstaben enthalten."
        );
        break;
      case "Einschränkungen":
        setErrorMessage(
          "Einschränkungen dürfen nicht mehr als 250 Zeichen sein."
        );
        break;
      case "Vorname":
        setErrorMessage("Bitte geben Sie Ihren Vornamen ein");
        break;
      case "Nachname":
        setErrorMessage("Bitte geben Sie ihren Nachnamen ein");
        break;
      case "Wohnort":
        setErrorMessage("Bitte geben Sie Ihre Stadt ein");
        break;
      default:
        setErrorMessage("");
        break;
    }
  };

  const updateUser = async (data) => {
    try {
      const axiosResp = await axiosConfig.patch(
        `/user/edit/${localStorage.getItem("userId")}`,
        data
      );
      setRefreshData(axiosResp.data);
      swal({
        title: `${editInputName} erfolgreich geändert!!`,
        icon: "success",
      });
      refreshData ? getUserData() : getUserData();
      setEditUserName(false);
      setEditFirstName(false);
      setEditLastName(false);
      setEditDisabilities(false);
      setEditLocation(false);
      setEditEmail(false);
      setEditPassword(false);
      setEditGender(false);
    } catch (error) {
      swal({
        title: "Da ist ein Fehler aufgetreten.",
        text: errorMessage,
        icon: "error",
      });
      setEditUserName(false);
      setEditFirstName(false);
      setEditLastName(false);
      setEditDisabilities(false);
      setEditLocation(false);
      setEditEmail(false);
      setEditPassword(false);
      setEditGender(false);
      console.log(error);
    }
  };

  const updateUserPassword = async (data) => {
    try {
      const axiosResp = await axiosConfig.patch(
        `/user/password/${localStorage.getItem("userId")}`,
        data
      );
      setRefreshData(axiosResp.data);
      swal({
        title: `${editInputName} erfolgreich geändert!!`,
        icon: "success",
      });
      refreshData ? getUserData() : getUserData();
      setEditPassword(false);
    } catch (error) {
      swal({
        title: "Da ist ein Fehler aufgetreten.",
        text: errorMessage,
        icon: "error",
      });
      setEditPassword(false);
      console.log(error);
    }
  };

  return (
    <div className="UpdateUser">
      <h1>Benutzerdaten Aktualisieren</h1>
      <ul>
        <li>
          <span className="col1">Benutzername: </span>
          <span className="col2">
            {!editUserName ? (
              <span>{userData.userName}</span>
            ) : (
              <input
                type="text"
                defaultValue={userData.userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            )}
              {!editUserName ? (
                <EditOutlined
                  className="edit-icon"
                  onClick={() => {
                    setEditUserName(true);
                    setEditInputName("Benutzername");
                    handleErrorMessage("Benutzername");
                  }}
                />
              ) : (
                <SaveOutlined
                  className="save-icon"
                  onClick={() => {
                    if (!userName) {
                      swal({ title: "Benutzername unverändert!" });
                      setEditUserName(false);
                    } else {
                      swal({
                        title: "Benutzername ändern?",
                        text: userName,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
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
                        } else {
                          swal({ title: "Benutzername ändern abgebrochen." });
                          setEditUserName(false);
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
          <span className="col1">Vorname: </span>
          <span className="col2">
            {!editFirstName ? (
              <span>{userData.firstName}</span>
            ) : (
              <input
                type="text"
                defaultValue={userData.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            )}
            {!editFirstName ? (
              <EditOutlined
              className="edit-icon"
                onClick={() => {
                  setEditFirstName(true);
                  setEditInputName("Vorname");
                  handleErrorMessage("Vorname");
                }}
              />
            ) : (
              <SaveOutlined
              className="save-icon"
                onClick={() => {
                  if (!firstName) {
                    swal({ title: "Vorname unverändert!" });
                    setEditFirstName(false);
                  } else {
                    swal({
                      title: "Vorname ändern?",
                      text: firstName,
                      icon: "warning",
                      buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                      dangerMode: true,
                    }).then((isConfirm) => {
                      if (isConfirm) {
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
                      } else {
                        swal({ title: "Vorname ändern abgebrochen." });
                        setEditFirstName(false);
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
              <span>{userData.lastName}</span>
            ) : (
              <input
                type="text"
                defaultValue={userData.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            )}
              {!editLastName ? (
                <EditOutlined
                  className="edit-icon"
                  onClick={() => {
                    setEditLastName(true);
                    setEditInputName("Nachname");
                    handleErrorMessage("Nachname");
                  }}
                />
              ) : (
                <SaveOutlined
                  className="save-icon"
                  onClick={() => {
                    if (!lastName) {
                      swal({ title: "Nachname unverändert!" });
                      setEditLastName(false);
                    } else {
                      swal({
                        title: "Nachname ändern?",
                        text: lastName,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
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
                        } else {
                          swal({ title: "Nachname ändern abgebrochen." });
                          setEditLastName(false);
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
          <span className="col1">Geschlecht: </span>
          <span className="col2">
            {!editGender ? (
              <span>{genderRender()}</span>
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
              {!editGender ? (
                <EditOutlined
                  className="edit-icon"
                  onClick={() => {
                    setEditGender(true);
                    setEditInputName("Geschlecht");
                    handleErrorMessage("Geschlecht");
                  }}
                />
              ) : (
                <SaveOutlined
                  className="save-icon"
                  onClick={() => {
                    if (!gender) {
                      swal({ title: "Geschlecht unverändert!" });
                      setEditGender(false);
                    } else {
                      swal({
                        title: "Geschlecht ändern?",
                        text: genderName,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
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
                        } else {
                          swal({ title: "Geschlecht ändern abgebrochen." });
                          setEditGender(false);
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
          <span className="col1">Einschränkungen: </span>
          <span className="col2">
            {!editDisabilities ? (
              <span>{userData.disabilities}</span>
            ) : (
              <input
                type="text"
                defaultValue={userData.disabilities}
                onChange={(e) => setDisabilities(e.target.value)}
                className="col2"
              />
            )}
              {!editDisabilities ? (
                <EditOutlined
                  className="edit-icon"
                  onClick={() => {
                    setEditDisabilities(true);
                    setEditInputName("Einschränkungen");
                    handleErrorMessage("Einschränkungen");
                  }}
                />
              ) : (
                <SaveOutlined
                  className="save-icon"
                  onClick={() => {
                    if (!disabilities) {
                      swal({ title: "Einschränkungen unverändert!" });
                      setEditDisabilities(false);
                    } else {
                      swal({
                        title: "Einschränkungen ändern?",
                        text: disabilities,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
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
                        } else {
                          swal({
                            title: "Einschränkungen ändern abgebrochen.",
                          });
                          setEditDisabilities(false);
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
          <span className="col1">Wohnort: </span>
          <span className="col2">
            {!editLocation ? (
              <span>{userData.location}</span>
            ) : (
              <input
                type="text"
                defaultValue={userData.location}
                onChange={(e) => setLocation(e.target.value)}
              />
            )}
              {!editLocation ? (
                <EditOutlined
                  className="edit-icon"
                  onClick={() => {
                    setEditLocation(true);
                    setEditInputName("Wohnort");
                    handleErrorMessage("Wohnort");
                  }}
                />
              ) : (
                <SaveOutlined
                  className="save-icon"
                  onClick={() => {
                    if (!location) {
                      swal({ title: "Wohnort unverändert!" });
                      setEditLocation(false);
                    } else {
                      swal({
                        title: "Wohnort ändern?",
                        text: location,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
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
                          localStorage.setItem(
                            "defSearch",
                            location.toLowerCase()
                          );
                        } else {
                          swal({ title: "Wohnort ändern abgebrochen." });
                          setEditLocation(false);
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
          <span className="col1">Email: </span>
          <span className="col2">
            {!editEmail ? (
              <span>{userData.email}</span>
            ) : (
              <input
                type="text"
                defaultValue={userData.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
              {!editEmail ? (
                <EditOutlined
                  className="edit-icon"
                  onClick={() => {
                    setEditEmail(true);
                    setEditInputName("Email");
                    handleErrorMessage("Email");
                  }}
                />
              ) : (
                <SaveOutlined
                  className="save-icon"
                  onClick={() => {
                    if (!email) {
                      swal({ title: "Email unverändert!" });
                      setEditEmail(false);
                    } else {
                      swal({
                        title: "Email ändern?",
                        text: email,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
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
                        } else {
                          swal({ title: "Email ändern abgebrochen." });
                          setEditEmail(false);
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
          <span className="col1">Passwort</span>
          <span className="col2">
          {!editPassword ? (
            <button
              className="button-dark-green col1"
              onClick={() => {
                setEditPassword(true);
                setEditInputName("Passwort");
                handleErrorMessage("Passwort");
              }}
            >
              Passwort ändern
            </button>
          ) : (
            <input
              type="password"
              className="col1"
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
            
            {!editPassword ? null : (
              <SaveOutlined
                className="save-icon"
                onClick={() => {
                  if (!password) {
                    swal({ title: "Passwort unverändert!" });
                    setEditPassword(false);
                  } else {
                    swal({
                      title: "Passwort ändern?",
                      icon: "warning",
                      buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                      dangerMode: true,
                    }).then((isConfirm) => {
                      if (isConfirm) {
                        const data = {
                          userName: userData.userName,
                          firstName: userData.firstName,
                          lastName: userData.lastName,
                          gender: userData.gender,
                          disabilities: userData.disabilities,
                          email: userData.email,
                          location: userData.location,
                          password: password,
                        };
                        updateUserPassword(data);
                      } else {
                        swal({ title: "Passwort ändern abgebrochen." });
                        setEditPassword(false);
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
