import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoginForm from "../components/LoginForm/LoginForm.js";
import axiosConfig from "./axiosConfig.js";

function AuthLogin() {
  const [isAuth, setIsAuth] = useState(false);

  const handleSuccessfulLogin = (respData) => {
    setIsAuth(true);
    localStorage.setItem("name", respData.userName);
  };

  const hasValidToken = () => {
    const cookieValue = Cookies.get("isLogged");
    if (!cookieValue) return false;
    const expireDate = decodeURIComponent(cookieValue);
    const expiresInMs = new Date(expireDate) - new Date();
    if (expiresInMs <= 0) return false;
    return true;
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);

    axiosConfig.post("/user/logout").then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    if (hasValidToken()) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <div>
      {!isAuth ? (
        <LoginForm handleSuccessfulLogin={handleSuccessfulLogin} />
      ) : (
        <>
          <p>Herzlich willkommen {localStorage.getItem("name")}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default AuthLogin;
