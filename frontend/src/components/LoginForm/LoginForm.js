import React, { useState, useRef } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import Nav from '../Nav/Nav'

function LoginForm(props) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formEl = useRef(null);
  const usernameEL = useRef(null);
  const passwordEl = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      userName: usernameEL.current.value,
      password: passwordEl.current.value,
    };
    try {
      setIsLoading(true);
      const axiosResp = await axiosConfig.post("/user/login", data);
      console.debug("axiosResp.data", axiosResp.data);
      setIsLoading(false);

      if (axiosResp.data.error) {
        setError(axiosResp.data.error.message);
        return;
      }
      setError(""); // Falls wir zuvor einen Fehler hatten, wird dieser entfernt
      props.handleSuccessfulLogin(axiosResp.data);
    } catch (error) {
      console.error("Error while sending with axios", error);
      setError(error);
      return;
    }

    formEl.current.reset(); // Alle Felder vom Formular leer machen
  };

  return (
    <div>
      <Nav />
      <form ref={formEl} method="post" onSubmit={submitHandler}>
        <h2>Login</h2>
        <label htmlFor="username"> Nutzername:</label>
        <input type="text" name="username" id="username" ref={usernameEL} />
        <label htmlFor="password">Passwort:</label>
        <input type="password" name="password" id="password" ref={passwordEl} />
        <input type="submit" value="einloggen" />
      </form>

      {error && <p>Da ist etwas schief gelaufen: {error}</p>}

      {isLoading && <p>Lade – bitte warten...</p>}
    </div>
  );
}

export default LoginForm;