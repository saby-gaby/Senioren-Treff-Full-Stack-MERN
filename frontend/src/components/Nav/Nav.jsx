import './Nav.css'
import React, { useContext, useState } from "react";
import { SectionsContext } from "../../context/sectionsContext";

const NavBar = () => {
  const {
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
    isAuth
  } = useContext(SectionsContext);

  const navigateToLogin = () => {
    setAllSectFalse();
    setIsLogin(true);
  };

  const navigateMeHome = () =>{
    setAllSectFalse();
    setIsHome(true);
  }

  const navigateToProfile =() =>{
    setAllSectFalse();
    setIsUserProfile(true)
  }

  return (
    <header className={isLogin ? "logo-center": null}>
      <div onClick={!isHome ? navigateMeHome: null} className="logo">
        <img src="logo.svg"></img>
      </div>
      {(!isLogin && !isAuth && !isRegister && !isUserProfile) ? <button onClick={navigateToLogin}>button</button>:null}
      {(!isUserProfile && isAuth && !isRegister) ? <button onClick={navigateToProfile}>Mein Bereich</button>:null}
      {isUserProfile && <p>Mein Bereich</p>}
      {isRegister && <p>Register</p>}
    </header>
  );
};

export default NavBar;