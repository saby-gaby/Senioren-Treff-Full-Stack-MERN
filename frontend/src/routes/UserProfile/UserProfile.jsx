import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SectionsContext } from "../../context/sectionsContext";

export default function UserProfil() {
  const { logout, isAuth } = useContext(SectionsContext);

  return (
    <div>
      <p>Herzlich willkommen {localStorage.getItem("userName")}</p>
      {/* {isAuth ?  */}<button onClick={logout}>Abmelden</button> {/* : <Navigate to="/" replace={true} />} */}
    </div>
  );
}
