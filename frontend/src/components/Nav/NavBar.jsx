import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Login from "../Login/Login";

const NavBar = (props) => {
  return (
    <div>
      {/* <Router> */}
      <div className="logo">
        <img src="logo.svg"></img>
      </div>
      <button>{props.NavLink}</button>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> 
      </Router>*/}
    </div>
  );
};

export default NavBar;
