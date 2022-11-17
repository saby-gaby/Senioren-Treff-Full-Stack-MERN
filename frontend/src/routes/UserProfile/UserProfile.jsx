import React, { useContext, useEffect, useState } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import axiosConfig from "../../util/axiosConfig";

export default function UserProfil() {
  const { logout, isAuth } = useContext(SectionsContext);
  
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const axiosResp = await axiosConfig
      .get(`http://localhost:6001/user/${userId}`);
    const data = axiosResp.data;
    setUserData(data);
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <h2>Herzlich willkommen {localStorage.getItem("userName")}</h2>
      <div>
        <h3>hier sind nur grob die Daten zusammengefasst zum testen</h3>
        <ul>
          <li>_id: {userData._id}</li>
          <li>userName: {userData.userName}</li>
          <li>firstName: {userData.firstName}</li>
          <li>lastName: {userData.lastName}</li>
          <li>gender: {userData.gender}</li>
          <li>disabilities: {userData.disabilities ? userData.disabilities : "keine Einschränkungen"}</li>
          <li>email: {userData.email}</li>
          <li>hashedpassword: {userData.password}</li>
          <li>location: {userData.location}</li>
          <li>localStorage userId: {localStorage.getItem("userId")}</li>
          <li>localstorage userName: {localStorage.getItem("userName")}</li>
          
        </ul>
        <h2>Meine erstellten Events:</h2>
        <ul>
          {userData.myEvents && userData.myEvents.map((ele, i) => {
            return <li key={i}>{ele.eventTitle + "id:" + ele._id}</li>
          })}
        </ul>
        <h2>Meine Merkliste:</h2>
        <ul>
          {userData.watchedEvents && userData.watchedEvents.map((ele, i) => {
            return <li key={i}>{ele.eventTitle + " id: " + ele._id}</li>
          })}
        </ul>
      </div>
      <button onClick={logout}>Abmelden</button>
    </div>
  );
}
