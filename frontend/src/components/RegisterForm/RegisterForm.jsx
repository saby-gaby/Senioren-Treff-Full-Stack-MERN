
import React, { useState, useRef } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import Nav from '../Nav/Nav';

export default function RegisterForm() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);

  const formEl = useRef(null);
  const userNameEl = useRef(null);
  const firstNameEl = useRef(null);
  const lastNameEl = useRef(null);
  const emailEl = useRef(null);
  const passwordEl = useRef(null);
  const locationEl = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      userName: userNameEl.current.value,
      firstName: firstNameEl.current.value,
      lastName: lastNameEl.current.value,
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
  };

  return (
    <div>
      <Nav />
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
          <strong>Sie haben sich erfolgreich registriert.</strong>
        ) : null}
      </p>
      <p>{isLoading ? <strong>Lade – bitte warten...</strong> : null}</p>
    </div>
  );
}
