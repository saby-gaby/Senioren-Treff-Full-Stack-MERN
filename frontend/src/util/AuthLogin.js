import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { SectionsContext } from "../context/sectionsContext.js";
import LoginForm from "../routes/LoginForm/LoginForm";
import UserProfile from "../routes/UserProfile/UserProfile.jsx";

function AuthLogin() {
  const { isAuth, setIsAuth, setAllSectFalse, setIsHome } =
    useContext(SectionsContext);

  const hasValidToken = () => {
    const cookieValue = Cookies.get("isLogged");
    console.log("cookieValue", cookieValue);
    console.log("expiresInMs", cookieValue - new Date().getTime());
    if (!cookieValue) return false;
    const expiresInMs = cookieValue - new Date().getTime();
    if (expiresInMs <= 0) return false;
    return true;
  };

  useEffect(() => {
    if (hasValidToken()) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return <div>{!isAuth ? <LoginForm /> : <UserProfile />}</div>;
}

export default AuthLogin;
