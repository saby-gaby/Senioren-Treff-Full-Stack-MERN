import { createContext, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SectionsContext = createContext();

const SectionsProvider = ({ children }) => {
  
  const navigate = useNavigate()

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

  const logout = () => {
    localStorage.clear();
    setIsAuth(false);

    axiosConfig.post("/user/logout").then((res) => {
      console.log(res.data);
    });
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
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsContext, SectionsProvider };
