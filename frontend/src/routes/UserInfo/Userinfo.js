import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../util/axiosConfig'
import { NavLink } from "react-router-dom";
import Search from '../../components/Search/Search';

export default function Userinfo() {

    const [userData, setUserData] = useState({})
    const [showMyEvents, setShowMyEvents] = useState(false);

    let userName = useParams()
    const getUserData = async () => {
        const response = await axiosInstance(`/userInfo/${userName.userName}`);
        setUserData(response.data[0])
    }

    useEffect(() => {
        getUserData()
    }, [])

  return (
      <div id='UserProfile'>
          <h2>Veranstaltungen von {userData.userName}</h2>
          
          <div id='eventbox'>
              <ul className="ShowEvents">
                {userData.myEvents &&
                  userData.myEvents.map((ele, i) => {
                    const categoryImage = () => {
                      let image;
                      switch (ele.category[0]) {
                        case "kultur":
                          image = "/images/kultur.jpg";
                          break;
                        case "sport":
                          image = "/images/sport.jpg";
                          break;
                        case "kurse":
                          image = "/images/kurse.jpg";
                          break;
                        case "spiele":
                          image = "/images/Würfel.jpg";
                          break;
                        case "reisen":
                          image = "/images/reisen.jpeg";
                          break;
                        case "natur":
                          image = "/images/natur.jpg";
                          break;
                        default:
                          image = "/images/default.webp";
                      }
                      return image;
                    };

                    return (
                      <li className="box" key={i}>
                        <h3>{ele.eventTitle}</h3>
                        {new Date(ele.date) < Date.now() ? (
                          <div className="expired">
                            Veranstaltung schon vorbei
                          </div>
                        ) : null}{" "}
                        {ele.imageUrl ? (
                          <img
                            src={"http://localhost:6001" + ele.imageUrl}
                            alt="image not found"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = `http://localhost:6001${categoryImage()}`;
                            }}
                          />
                        ) : (
                          <img
                            src={"http://localhost:6001" + categoryImage()}
                            alt="test"
                          />
                        )}
                        <h4>
                          {new Date(ele.date).toLocaleDateString()} {"||"}{" "}
                          {ele.time} Uhr
                        </h4>
                        <div>
                          <NavLink
                            to={`/event/${ele._id}`}
                            className="button-green"
                          >
                            Ansehen
                          </NavLink>
                        </div>
                      </li>
                    );
                  })}
              </ul>
          </div>
      </div>
  )
}
