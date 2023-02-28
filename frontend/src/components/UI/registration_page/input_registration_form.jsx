import React, { useState } from "react";
import classes from "./reg_form.css";

const InputRegForm = (props) => {
  const [value, SetValue] = props.state;

  function Change(event) {
    SetValue(event.target.value);
  }

  return (
    <div>
      <label htmlFor={props.name} className="label_style">
        {props.label}{" "}
      </label>
      <p className="label_style">
        <input
          className="input_form"
          name={props.name}
          value={value}
          onChange={Change}
        ></input>
      </p>
    </div>
  );
};

export default InputRegForm;
