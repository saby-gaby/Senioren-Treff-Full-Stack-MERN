import { createContext, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const SectionsContext = createContext();

const SectionsProvider = ({ children }) => {
  const [isHome, setIsHome] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isEventForm, setIsEventForm] = useState(false);
  const [isOneEvent, setIsOneEvent] = useState(false);
  const [isSearchedEvents, setIsSearchedEvents] = useState(false);
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [isAuth, setIsAuth] = useState(() => {
    const token = Cookies.get("jwt");
    const decodedToken = jwt_decode(token, { complete: true });

    const newDate = parseInt(new Date().getTime() / 1000);

    if (decodedToken.exp < newDate) {
      return false;
    } else {
      return true;
    }
  });

  const setAllSectFalse = () => {
    setIsLogin(false);
    setIsHome(false);
    setIsRegister(false);
    setIsEventForm(false);
    setIsOneEvent(false);
    setIsSearchedEvents(false);
    setIsUserProfile(false);
  };

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);

    axiosConfig.post("/user/logout").then((res) => {
      console.log(res.data);
    });
    setAllSectFalse();
    setIsHome(true);
  };

  return (
    <SectionsContext.Provider
      value={{
        logout,
        setAllSectFalse,
        isHome,
        setIsHome,
        isLogin,
        setIsLogin,
        isRegister,
        setIsRegister,
        isEventForm,
        setIsEventForm,
        isOneEvent,
        setIsOneEvent,
        isSearchedEvents,
        setIsSearchedEvents,
        isUserProfile,
        setIsUserProfile,
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsContext, SectionsProvider };
