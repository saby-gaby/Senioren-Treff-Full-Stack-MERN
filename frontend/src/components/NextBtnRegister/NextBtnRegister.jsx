import React from "react";
import axiosConfig from "../../util/axiosConfig";
import swal from "sweetalert";

function NextBtnToStepTwo({
  userName,
  firstName,
  lastName,
  location,
  setOne,
  setTwo,
}) {
  const validateInput = async () => {
    const uniqueUserName = async () => {
      try {
        const axiosResp = axiosConfig.get(`/user/username/${userName}`);
        return (await axiosResp).data;
      } catch (error) {
          console.log(error.message);
      }
    };

    const userExists = await uniqueUserName();

    if (userName.length === 0) {
      swal({ title: "Benutzername", text: " ist ein Pflichtfeld." });
    } else if (userExists) {
      swal({ title: `Benutzername "${userExists}"`, text: " ist bereits vergeben." });
    } else if (
      userName.length > 20 ||
      (userName.length < 4 && userName.length > 0)
    ) {
      swal({
        title: "Benutzername",
        text: " muss mindestens 4 Zeichen und maximal 20 Zeichen lang sein.",
      });
    } else if (firstName.length === 0) {
      swal({ title: "Vorname", text: " ist ein Pflichtfeld." });
    } else if (lastName.length === 0) {
      swal({ title: "Nachname", text: " ist ein Pflichtfeld." });
    } else if (location.length === 0) {
      swal({ title: "Wohnort", text: " ist ein Pflichtfeld." });
    } else {
      setOne(false);
      setTwo(true);
    }
  };

  return (
    <span className="button-green" onClick={validateInput}>
      Weiter
    </span>
  );
}

const NextBtnToThree = ({ setTwo, setThree,disabilities }) => {
  const setThreeTrue = () => {
    if(disabilities.length>250){
      swal({title:"Sie haben den maximal Anzahl Zeichen bei Eventuelle Einschränkungen überschritten", text:"max 250 Zeichen"})
    }else{
      setTwo(false);
      setThree(true);
    }
  };
  return (
    <span className="button-green" onClick={setThreeTrue}>
      Weiter
    </span>
  );
};

export { NextBtnToStepTwo, NextBtnToThree };
