import React from "react";
import "./GenderRadioBtn.css"

export default function GenderRadioBtn({ props, gender }) {
  const genderLabelValue = (gender) => {
    switch (gender) {
      case "female":
        return "Weiblich";
        break;
      case "male":
        return "Männlich";
        break;
      case "diverse":
        return "Nicht binär";
        break;
      default:
        return "keine Angabe";
    }
  };

  return (
    <>
      <label htmlFor={gender} className={gender===props.genderRadio?"button-dark-green":"button-beige"}>
        <input
          onClick={(e) => props.setGenderRadio(e.target.value)}
          type="radio"
          name="gender"
          id={gender}
          value={gender}
        />
        {genderLabelValue(gender)}
      </label>
    </>
  );
}
