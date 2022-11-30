import React from "react";
import axiosConfig from "../../util/axiosConfig";
import swal from "sweetalert";

function NextBtnToStepTwo({ props }) {
  const uniqueUserName = async () => {
    try {
      const axiosResp = axiosConfig.get(`/user/username/${props.userName}`);
      return (await axiosResp).data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const validateInput = async () => {
    let userExists;

    if (props.userName.length > 0) {
      userExists = await uniqueUserName();
    }

    if (props.userName.length === 0) {
      swal({ title: "Benutzername", text: " ist ein Pflichtfeld." });
    } else if (userExists) {
      swal({
        title: `Benutzername "${userExists}"`,
        text: " ist bereits vergeben.",
      });
    } else if (
      props.userName.length > 20 ||
      (userName.length < 4 && userName.length > 0)
    ) {
      swal({
        title: "Benutzername",
        text: " muss mindestens 4 Zeichen und maximal 20 Zeichen lang sein.",
      });
    } else if (props.firstName.length === 0) {
      swal({ title: "Vorname", text: " ist ein Pflichtfeld." });
    } else if (props.lastName.length === 0) {
      swal({ title: "Nachname", text: " ist ein Pflichtfeld." });
    } else if (props.location.length === 0) {
      swal({ title: "Wohnort", text: " ist ein Pflichtfeld." });
    } else {
      props.setOne(false);
      props.setTwo(true);
    }
  };

  return (
    <span className="button-green" onClick={validateInput}>
      Weiter
    </span>
  );
}

const NextBtnToThree = ({ props }) => {
  const setThreeTrue = () => {
    if (props.disabilities.length > 250) {
      swal({
        title:
          "Sie haben den maximal Anzahl Zeichen bei Eventuelle Einschränkungen überschritten",
        text: "max 250 Zeichen",
      });
    } else {
      props.setTwo(false);
      props.setThree(true);
    }
  };
  return (
    <span className="button-green" onClick={setThreeTrue}>
      Weiter
    </span>
  );
};

const SubmitBtn = ({submitHandler, props }) => {
  const validateDataStepThree = async (e) => {
    e.preventDefault();
    const validateEmail = async () => {
      try {
        const axiosResp = axiosConfig.get(`/user/email/${props.email}`);
        return (await axiosResp).data;
      } catch (error) {
        console.log(error.message);
      }
    };
    let emailExists;
    if (props.password.length > 0) {
      emailExists = await validateEmail();
    }

    if (emailExists) {
      swal({
        titel: "E-Mail Adresse bereits vergeben",
        text: "Probieren Sie andere E-Mail",
      });
    } else if (props.password.length === 0) {
      swal({ title: "Passwort", text: " ist ein Pflichtfeld" });
    } else {
      submitHandler();
    }
  };

  return (
    <input
      onClick={validateDataStepThree}
      className="button-green"
      type="submit"
      value="Registrieren"
    />
  );
};

const ResetBtn = ({ props }) => {
  const resetAll = () => {
    if (!props.stepOne) props.setOne(true);
    if (props.stepTwo) props.setTwo(false);
    if (props.stepThree) props.setThree(false);
    if (props.userName !== "") props.setUserName("");
    if (props.firstName !== "") props.setFirstName("");
    if (props.lastName !== "") props.setLastName("");
    if (props.genderRadio !== "none") props.setGenderRadio("none");
    if (props.email !== "") props.setEmail("");
    if (props.password !== "") props.setPassword("");
    if (props.location !== "") props.setLocation("");
    if (props.disabilities !== "") props.setDisabilities("");
    props.formEl.reset();
  };
  return (
    <span onClick={resetAll} className="button-beige">
      Reset
    </span>
  );
};

export { NextBtnToStepTwo, NextBtnToThree, SubmitBtn, ResetBtn };
