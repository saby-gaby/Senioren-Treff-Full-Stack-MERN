import React, { useState, useRef, useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/sectionsContext.js";
import "./RegisterForm.css";
import GenderRadioBtn from "../../components/Gender/GenderRadioBtn.jsx";
import {
  TextInput,
  MailInput,
  PasswordInput,
} from "../../components/Inputs/Inputs.jsx";
import {
  NextBtnToStepTwo,
  NextBtnToThree,
} from "../../components/NextBtnRegister/NextBtnRegister.jsx";

export default function RegisterForm() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const { isAuth, navigate, setIsAuth } = useContext(SectionsContext);

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);

  const formEl = useRef(null);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [genderRadio, setGenderRadio] = useState("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [disabilities, setDisabilities] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      gender: genderRadio,
      disabilities: disabilities,
      email: email,
      password: password,
      location: location,
    };

    try {
      setHasRegistered(false);
      setIsLoading(true);
      const axiosResp = await axiosConfig.post("/user", data);
      console.debug("axiosResp.data:", axiosResp.data);
      setIsLoading(false);
      if (axiosResp.data.error) {
        setIsError(true);
        setIsLoading(false);
        setHasRegistered(false);
        return;
      }
    } catch (error) {
      console.error("Error while sending with axios", error);
      setIsError(true);
      setIsLoading(false);
      setHasRegistered(false);
      return;
    }
    setIsError(false);
    setHasRegistered(true);
    logIn(data);
  };

  const logIn = async (data) => {
    try {
      const axiosResp = await axiosConfig.post("/user/login", data);
      console.log("successful logged in");
      handleSuccessfulLogin(axiosResp.data, data.location);
    } catch (error) {
      console.log("fehler beim login", error);
    }
  };

  const handleSuccessfulLogin = (respData, location) => {
    const locationLowercase = location.toLowerCase();
    localStorage.setItem("defSearch", locationLowercase);
    setIsAuth(true);
    localStorage.setItem("userName", respData.userName);
    localStorage.setItem("userId", respData.userId);
  };

  return (
    <div>
      <h2>RegisterForm</h2>
      <form ref={formEl} method="POST" action="/user" onSubmit={submitHandler}>
        {stepOne && (
          <div>
            <label htmlFor="userName">
              Benutzername:<sup>*</sup> 
            </label>
            <TextInput labelValue="userName" stateFunc={setUserName} />
            <label htmlFor="firstName">
              Vorname:<sup>*</sup> 
            </label>
            <TextInput labelValue="firstName" stateFunc={setFirstName} />
            <label htmlFor="lastName">
              Nachname:<sup>*</sup> 
            </label>
            <TextInput labelValue="lastName" stateFunc={setLastName} />
            <label htmlFor="location">
              Wohnort:<sup>*</sup> 
            </label>
            <TextInput labelValue="location" stateFunc={setLocation} />
            <NextBtnToStepTwo
              userName={userName}
              firstName={firstName}
              lastName={lastName}
              location={location}
              setOne={setStepOne}
              setTwo={setStepTwo}
            />
            {/* <button
              className="button-green"
              onClick={() => {
                setStepOne(false);
                setStepTwo(true);
              }}
            >
              Weiter
            </button> */}
          </div>
        )}
        {stepTwo && (
          <div>
            {/* <button
              className="button-beige"
              onClick={() => {
                setStepOne(true);
                setStepTwo(false);
              }}
            >
              Zurück
            </button> */}
            <h3>Geschlecht:<sup>*</sup></h3>
            <GenderRadioBtn gender="female" setGenderRadio={setGenderRadio} genderRadio={genderRadio} />
            <GenderRadioBtn gender="male" setGenderRadio={setGenderRadio} genderRadio={genderRadio} />
            <GenderRadioBtn gender="diverse" setGenderRadio={setGenderRadio} genderRadio={genderRadio} />
            <GenderRadioBtn gender="none" setGenderRadio={setGenderRadio} genderRadio={genderRadio} />
            <label htmlFor="disabilities">Eventuelle Einschränkung </label>
            <TextInput labelValue="disabilities" stateFunc={setDisabilities} />
            <NextBtnToThree
              genderRadio={genderRadio}
              setTwo={setStepTwo}
              setThree={setStepThree}
              disabilities={disabilities}
            />
            {/* <button
              className="button-green"
              onClick={() => {
                setStepTwo(false);
                setStepThree(true);
              }}
            >
              Weiter
            </button> */}
          </div>
        )}
        {stepThree && (
          <div>
            {/* <button
              className="button"
              onClick={() => {
                setStepTwo(true);
                setStepThree(false);
              }}
            >
              Zurück
            </button> */}
            <label htmlFor="email"> E-Mail Adresse:</label>
            <MailInput labelValue="email" stateFunc={setEmail} />
            <label htmlFor="password"> Passwort: </label>
            <PasswordInput labelValue="password" stateFunc={setPassword} />
            <input
              className="button-green"
              type="submit"
              value="Registrieren"
            />
          </div>
        )}
      </form>
      <p>{isError && <strong>Es ist ein Fehler aufgetreten.</strong>}</p>
      <p>
        {hasRegistered && (
          <strong>Sie haben sich erfolgreich registriert.</strong>
        )}
        {isAuth && <Navigate to="/profile" />}
      </p>
      <p>{isLoading ? <strong>Lade – bitte warten...</strong> : null}</p>
      <NavLink to={"/login"} className="button-green">
        bereits registriert?
      </NavLink>
    </div>
  );
}
