import React from "react";

export default function GenderRadioBtn({ gender, setGenderRadio }) {

  const genderLabelValue=(gender)=>{
    switch(gender){
      case "female": return "Weiblich";break;
      case "male": return "Männlich";break;
      case "diverse": return "Nicht binär";break;
      default: return "keine Angabe";
    }
  };

  return (
    <>
      <label htmlFor={gender}>
        <input
          onClick={(e) => setGenderRadio(e.target.value)}
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
