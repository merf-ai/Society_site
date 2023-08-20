import React, { useState } from "react";
const css = require('./reg_form.css')

interface IInputRegistrationProps {
  name: string,
  label: string
  state: any[]
}

const InputRegForm = (props: IInputRegistrationProps) => {
  const [value, SetValue] = props.state;

  function Change(event: any) {
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
