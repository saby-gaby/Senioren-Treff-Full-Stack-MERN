import React, { useState, useRef, useContext } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/sectionsContext";
import { Navigate, NavLink } from "react-router-dom";
import "./LoginForm.css";
import swal from "sweetalert";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    isAuth,
    setIsAuth,
    eventLogin,
    setStepOne,
    backToEvent,
    interestedEvent,
  } = useContext(SectionsContext);

  const formEl = useRef(null);
  const usernameEL = useRef(null);
  const passwordEl = useRef(null);

  const getUserData = async (respData) => {
    const axiosResp = await axiosConfig.get(
      `http://localhost:6001/user/${respData}`
    );
    const defSearch = axiosResp.data.location.toLowerCase();
    return defSearch;
  };

  const handleSuccessfulLogin = async (respData) => {
    localStorage.setItem("defSearch", await getUserData(respData.userId));
    setIsAuth(true);
    localStorage.setItem("userName", respData.userName);
    localStorage.setItem("userId", respData.userId);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let data;
    if (usernameEL.current.value && passwordEl.current.value) {
      data = {
        userName: usernameEL.current.value,
        password: passwordEl.current.value,
      };
      try {
        setIsLoading(true);
        const axiosResp = await axiosConfig.post("/user/login", data);
        console.debug("axiosResp.data", axiosResp.data);
        setIsLoading(false);

        if (axiosResp.data.error) {
          swal({
            title: "Benutzername-Passwort-Kombination nicht korrekt",
            text: "Nochmal versuchen?",
          });
          return;
        }
        handleSuccessfulLogin(axiosResp.data);
      } catch (error) {
        console.error("Error while sending with axios", error);
        return;
      }
    } else {
      swal({
        title: "Bitte tragen Sie Ihren Benutzername und Passwort ein",
        button: "OK",
      });
    }

    formEl.current.reset(); // Alle Felder vom Formular leer machen
  };

  return (
    <div className="LoginForm">
      {isAuth && eventLogin && <Navigate to="/event-form" replace={true} />}
      {isAuth && backToEvent && (
        <Navigate to={`/event/${interestedEvent}`} replace={true} />
      )}
      {isAuth && !eventLogin && !backToEvent ? (
        <Navigate to="/profile" replace={true} />
      ) : (
        <>
          <h2>Anmelden</h2>
          <form ref={formEl} method="post" onSubmit={submitHandler}>
            <label htmlFor="username">
              Benutzername:
              <input
                type="text"
                name="username"
                id="username"
                ref={usernameEL}
                placeholder="dein Benutzername"
              />
            </label>
            <label htmlFor="password">
              Passwort:
              <input
                type="password"
                name="password"
                id="password"
                ref={passwordEl}
                placeholder="dein Passwort"
              />
            </label>
            <input className="button-green" type="submit" value="Anmelden" />
          </form>
        </>
      )}

      <h2>Sie haben noch kein Konto?</h2>
      <div className="toRegister">
        <p>als neuer Benutzer</p>
        <NavLink to={"/register"} className="button-green">
          Registrieren
        </NavLink>
      </div>

      {isLoading && <p>Lade - bitte warten...</p>}
    </div>
  );
}

export default LoginForm;
