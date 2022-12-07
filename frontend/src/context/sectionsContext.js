import { createContext, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SectionsContext = createContext();

const SectionsProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(() => {
    const isLoggedCookie = Cookies.get("isLogged");
    if (!isLoggedCookie) return false;
    const newDate = parseInt(new Date().getTime());
    if (isLoggedCookie < newDate) {
      return false;
    } else {
      return true;
    }
  });

  const [foundEvents, setFoundEvents] = useState();
  const [eventLogin, setEventLogin] = useState(false);
  const [categoryArray, setCategoryArray] = useState();
  const [userData, setUserData] = useState({});
  const [backToEvent, setBackToEvent] = useState(false);
  const [interestedEvent, setInterestedEvent] = useState(null);

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);
    setEventLogin(false);
    axiosConfig.post("/user/logout").then((res) => {
      console.log(res.data);
    });
    swal({
      title: `Du hast dich erfolgreich abgemeldet`,
      icon: "success",
    });
    navigate("/login");
  };

  const capitalize = (term) => {
    if (term.length == 2) {
      return term.toUpperCase();
    } else if (term.includes(" ")) {
      return term
        .split(" ")
        .map((name) => name[0].toUpperCase() + name.substring(1).toLowerCase())
        .join(" ");
    } else if (term.includes("-")) {
      return term
        .split("-")
        .map((name) => name[0].toUpperCase() + name.substring(1).toLowerCase())
        .join("-");
    } else {
      return term[0].toUpperCase() + term.substring(1).toLowerCase();
    }
  };

  return (
    <SectionsContext.Provider
      value={{
        isAuth,
        logout,
        setIsAuth,
        foundEvents,
        setFoundEvents,
        navigate,
        eventLogin,
        setEventLogin,
        categoryArray,
        setCategoryArray,
        userData,
        setUserData,
        capitalize,
        backToEvent,
        setBackToEvent,
        interestedEvent,
        setInterestedEvent
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsContext, SectionsProvider };
