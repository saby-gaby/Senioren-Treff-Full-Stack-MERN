import React from "react";

const NavBar = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5">
          <div className="logo">
            <a href="/">Renter Treff</a>
          </div>
        </div>
        <div className="auth-btns col-md-7">
          <button className="btn sign-up">Sign Up</button>
          <button className="btn sign-in">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
