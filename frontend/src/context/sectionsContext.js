import { createContext, useState } from "react";

const SectionsContext = createContext();

const SectionsProvider = ({ children }) => {
  const [isHome, setIsHome] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [isEventForm, setIsEventForm] = useState(false);
  const [isOneEvent, setIsOneEvent] = useState(false);
  const [isSearchedEvents, setIsSearchedEvents] = useState(false);
  const [isUserProfile, setIsUserProfile] = useState(false);

  return (
    <SectionsContext.Provider
      value={{
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
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsContext, SectionsProvider };
