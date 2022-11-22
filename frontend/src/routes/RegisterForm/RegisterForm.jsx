import React, { useState, useRef, useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/sectionsContext.js";
import "./RegisterForm.css";

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
  const [genderRadio, setGenderRadio] = useState("");
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
    formEl.current.reset();
    try {
      const axiosResp = await axiosConfig.post("/user/login", data);
      console.log("successful logged in");
      handleSuccessfulLogin(axiosResp.data);
    } catch (error) {
      console.log("fehler beim login", error);
    }
  };

  const handleSuccessfulLogin = (respData) => {
    setIsAuth(true);
    localStorage.setItem("userName", respData.userName);
    localStorage.setItem("userId", respData.userId);
  };

  return (
    <div>
      {}
      RegisterForm
      <form ref={formEl} method="POST" action="/user" onSubmit={submitHandler}>
        {stepOne ? (
          <div>
            <label htmlFor="">
              {" "}
              Benutzername:
              <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="userName"
                id="userName"
                required
              />
            </label>
            <label htmlFor="">
              Vorname:
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                name="firstName"
                id="firstName"
                required
              />
            </label>
            <label htmlFor="">
              Nachname:
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                name="lastName"
                id="lastName"
                required
              />
            </label>
            <label htmlFor="">
              Wohnort:
              <input
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                name="location"
                id="location"
                required
              />
            </label>
            <button
              className="button"
              onClick={() => {
                setStepOne(false);
                setStepTwo(true);
              }}
            >
              Weiter
            </button>
          </div>
        ) : (
          ""
        )}
        {stepTwo ? <div>
          Geschlecht:
          <label htmlFor="female">
            <input
              onClick={() => setGenderRadio("female")}
              type="radio"
              name="gender"
              id="female"
              value="female"
            />
            Weiblich
          </label>
          <label htmlFor="male">
            <input
              onClick={() => setGenderRadio("male")}
              type="radio"
              name="gender"
              id="male"
              value="male"
            />
            Männlich
          </label>
          <label htmlFor="diverse">
            <input
              onClick={() => setGenderRadio("diverse")}
              type="radio"
              name="gender"
              id="diverse"
              value="diverse"
            />
            Nicht binär
          </label>
          <label htmlFor="none">
            <input
              onClick={() => setGenderRadio("none")}
              type="radio"
              name="gender"
              id="none"
              value="none"
            />
            keine Angabe
          </label>
          <label htmlFor="">
            eventuelle Einschränkung
            <input
              type="text"
              name="disabilities"
              id="disabilities"
              onChange={(e)=>setDisabilities(e.target.value)}
            />
          </label>
          <button className="button" onClick={() => {
            setStepOne(true)
            setStepTwo(false)
          }}>Zurück</button>
          <button className="button" onClick={() => {
            setStepTwo(false)
            setStepThree(true)
          }}>Weiter</button>
        </div> : ""}
        {stepThree ? <div>
          <label htmlFor="">
            E-Mail Adresse:
            <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" required />
          </label>
          <label htmlFor="">
            Passwort:
            <input
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              required
            />
          </label>
          <button className="button" onClick={() => {
            setStepTwo(true)
            setStepThree(false)
          }}>Zurück</button>
          <input className="button" type="submit" value="Registrieren" />
        </div> : ""}
      </form>
      <p>{isError ? <strong>Es ist ein Fehler aufgetreten.</strong> : null}</p>
      <p>
        {hasRegistered ? (
          <>
            <strong>Sie haben sich erfolgreich registriert.</strong>
          </>
        ) : null}
        {isAuth && <Navigate to="/profile" />}
      </p>
      <p>{isLoading ? <strong>Lade – bitte warten...</strong> : null}</p>
      <NavLink to={"/login"} className="button-green">
        bereits registriert?
      </NavLink>
    </div>
  );
}
