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
  SubmitBtn,
  ResetBtn,
} from "../../components/NextBtnRegister/NextBtnRegister.jsx";
import swal from "sweetalert";

export default function RegisterForm() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const { isAuth, setIsAuth } = useContext(SectionsContext);

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
  
  const props = {
    userName: userName,
    setUserName: setUserName,
    firstName: firstName,
    setFirstName: setFirstName,
    lastName: lastName,
    setLastName: setLastName,
    location: location,
    setLocation: setLocation,
    genderRadio: genderRadio,
    setGenderRadio: setGenderRadio,
    disabilities: disabilities,
    setDisabilities: setDisabilities,
    password: password,
    setPassword: setPassword,
    email: email,
    setEmail: setEmail,
    stepOne: stepOne,
    setOne: setStepOne,
    stepTwo: stepTwo,
    setTwo: setStepTwo,
    stepThree: stepThree,
    setThree: setStepThree,
  };

  const submitHandler = async () => {
    /*  e.preventDefault(); */
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
      for (const err of error.response.data.errors) {
        if (err.msg === "Invalid value" && err.param === "password") {
          swal({
            title:
              "Ihr Passwort muss mindestens 8 Zeichen lang sein und eine Zahl, einen Groß- und einen Kleinbuchstaben enthalten.",
          });
        } else {
          setIsError(true);
          setIsLoading(false);
          setHasRegistered(false);
        }
      }
      console.error("Error while sending with axios", error);
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
      console.log("Fehler beim login", error);
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
      <form ref={formEl} method="POST" action="/user">
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
            <NextBtnToStepTwo props={props} />
          </div>
        )}
        {stepTwo && (
          <div>
            <h3>
              Geschlecht:<sup>*</sup>
            </h3>
            <GenderRadioBtn gender="female" props={props} />
            <GenderRadioBtn gender="male" props={props} />
            <GenderRadioBtn gender="diverse" props={props} />
            <GenderRadioBtn gender="none" props={props} />
            <label htmlFor="disabilities">Eventuelle Einschränkung </label>
            <TextInput labelValue="disabilities" stateFunc={setDisabilities} />
            <NextBtnToThree props={props} />
            <ResetBtn props={props} />
          </div>
        )}
        {stepThree && (
          <div>
            <label htmlFor="email"> E-Mail Adresse:</label>
            <MailInput labelValue="email" stateFunc={setEmail} />
            <label htmlFor="password"> Passwort: </label>
            <PasswordInput labelValue="password" stateFunc={setPassword} />
            <SubmitBtn props={props} submitHandler={submitHandler} />
            <ResetBtn props={props} />
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
