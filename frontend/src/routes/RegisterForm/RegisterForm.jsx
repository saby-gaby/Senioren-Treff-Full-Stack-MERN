import React, { useState, useRef, useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/sectionsContext.js";

export default function RegisterForm() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const { isAuth, navigate, setIsAuth } = useContext(SectionsContext)

  const formEl = useRef(null);
  const userNameEl = useRef(null);
  const firstNameEl = useRef(null);
  const lastNameEl = useRef(null);
  const emailEl = useRef(null);
  const passwordEl = useRef(null);
  const locationEl = useRef(null);
  const genderEl = useRef(null);
  const disabilitiesEl = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      userName: userNameEl.current.value,
      firstName: firstNameEl.current.value,
      lastName: lastNameEl.current.value,
      gender: genderEl.current.value,
      disabilities: disabilitiesEl.current.value,
      email: emailEl.current.value,
      password: passwordEl.current.value,
      location: locationEl.current.value,
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
      handleSuccessfulLogin(axiosResp.data)
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
        <label htmlFor="">
          {" "}
          Benutzername:
          <input
            ref={userNameEl}
            type="text"
            name="userName"
            id="userName"
            required
          />
        </label>
        <label htmlFor="">
          Vorname:
          <input
            ref={firstNameEl}
            type="text"
            name="firstName"
            id="firstName"
            required
          />
        </label>
        <label htmlFor="">
          Nachname:
          <input
            ref={lastNameEl}
            type="text"
            name="lastName"
            id="lastName"
            required
          />
        </label>
        <label htmlFor="">
          Geschlecht:
          <select name="gender" id="gender" ref={genderEl}>
            <option value="female">Frau</option>
            <option value="male">Mann</option>
            <option value="diverse">Nicht binär</option>
            <option value="none">keine Angabe</option>
          </select>
        </label>
        <label htmlFor="">
          eventuelle Einschränkung
          <input
            type="text"
            name="disabilities"
            id="disabilities"
            ref={disabilitiesEl}
          />
        </label>

        <label htmlFor="">
          E-Mail Adresse:
          <input ref={emailEl} type="email" name="email" id="email" required />
        </label>
        <label htmlFor="">
          Passwort:
          <input
            ref={passwordEl}
            type="password"
            name="password"
            id="password"
            required
          />
        </label>
        <label htmlFor="">
          Wohnort:
          <input
            ref={locationEl}
            type="text"
            name="location"
            id="location"
            required
          />
        </label>
        <input type="submit" value="Registrieren" />
      </form>
      <p>{isError ? <strong>Es ist ein Fehler aufgetreten.</strong> : null}</p>
      <p>
        {hasRegistered ? (
          <>
            <strong>Sie haben sich erfolgreich registriert.</strong>
          </>
        ) : null}
        {isAuth && <Navigate to="/profile"/>}
      </p>
      <p>{isLoading ? <strong>Lade – bitte warten...</strong> : null}</p>
      <NavLink to={"/login"}>bereits registriert?</NavLink>
    </div>
  );
}
