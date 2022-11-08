import React from "react";
import Login from "../Login/Login";

const NavBar = (props) => {
  return (
    <div>

      <div className="logo">
        <img src="logo.svg"></img>
      </div>
      <button>{props.NavLink}</button>

    </div>
  );
};

export default NavBar;
