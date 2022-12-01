import React from "react";
import "./Inputs.css";

function TextInput({ labelValue, stateFunc }) {
  const setInputValue = (e) => stateFunc(e.target.value);

  return (
    <input
      onChange={setInputValue}
      type="text"
      name={labelValue}
      id={labelValue}
    />
  );
}

function MailInput({ labelValue, stateFunc }) {
  const setInputValue = (e) => stateFunc(e.target.value);

  return (
    <input
      onChange={setInputValue}
      type="email"
      name={labelValue}
      id={labelValue}
    />
  );
}

function PasswordInput({ labelValue, stateFunc }) {
  const setInputValue = (e) => stateFunc(e.target.value);

  return (
    <input
      onChange={setInputValue}
      type="password"
      name={labelValue}
      id={labelValue}
    />
  );
}

export {TextInput, MailInput, PasswordInput}