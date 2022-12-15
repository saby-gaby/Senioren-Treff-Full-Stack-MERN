import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../util/axiosConfig";
import { NavLink } from "react-router-dom";
import { SectionsContext } from "../../context/sectionsContext";
import swal from "sweetalert";
import { DeleteOutlined } from "@ant-design/icons";
import "./Userinfo.css";

export default function Userinfo() {
  const formEl = useRef();

  const [userData, setUserData] = useState({});
  const [comment, setComment] = useState({});
  const [commentsReverse, setCommentsReverse] = useState([])

  const { navigate, isAuth } = useContext(SectionsContext);

  let userName = useParams();

  const getUserData = async () => {
    const response = await axiosInstance.get(`/userInfo/${userName.userName}`);
    setUserData(response.data[0]);
    setCommentsReverse(response.data[0].comments.reverse())
  };

  useEffect(() => {
    getUserData();
  }, [userName]);

  const handleSubmit = async (data) => {
    await axiosInstance.patch(`/user/comment/${userData._id}`, data);
    getUserData();
    formEl.current.reset();
  };

  const deleteComment = async (comment) => {
    let commentsArr = [];
    userData.comments.map((ele, i) => {
      commentsArr.push(ele);
    });

    swal({
      title: "Diesen Kommentar wirklich löschen?",
      icon: "warning",
      buttons: ["Nein, nicht löschen!", "Ja, löschen!"],
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        swal({
          title: "Kommentar erfolgreich gelöscht!",
          icon: "success",
        }).then(async () => {
          axiosInstance.patch(`/user/${localStorage.getItem("userId")}`, {
            comments: commentsArr.filter((x) => x.comment !== comment),
          });
          location.reload();
        });
      } else {
        swal({
          title: "Kommentar löschen abgebrochen.",
        });
      }
    });
  };

  return (
    <div id="Userinfo">
      <h2>Veranstaltungen von {userData && userData.userName}</h2>
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
                  <div className="expired">Veranstaltung schon vorbei</div>
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
                  {new Date(ele.date).toLocaleDateString()} {"||"} {ele.time}{" "}
                  Uhr
                </h4>
                <div>
                  <NavLink to={`/event/${ele._id}`} className="button-green">
                    Ansehen
                  </NavLink>
                </div>
              </li>
            );
          })}
      </ul>

        <h3>Kommentare</h3>
      <div id="Comments">
        <ul>
          {userData.comments &&
            commentsReverse.map((ele, i) => {
              return (
                <li key={i} className="commentBox">
                  <div>
                    Von
                    <span
                      onClick={() => {
                        navigate(`/user/${ele.userName}`);
                      }}
                    >
                      @{ele.userName}
                    </span>
                    :
                  </div>
                  <p>{ele.comment}{localStorage.getItem("userId") == userData._id && (
                    <DeleteOutlined onClick={() => {
                      deleteComment(ele.comment);
                    }} />
                  )}</p>
                  
                </li>
              );
            })}
        </ul>

        {isAuth && (
          <form
            ref={formEl}
            onSubmit={(e) => {
              e.preventDefault();
              const data = {
                userName: localStorage.getItem("userName"),
                comment: comment,
              };
              handleSubmit(data);
            }}
          >
            <h4>Schreibe einen Kommentar</h4>
            <textarea
              rows="10"
              cols="60"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <input className="button-green" type="submit" />
          </form>
        )}
      </div>
    </div>
  );
}
