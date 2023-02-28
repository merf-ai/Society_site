import React from "react";
import classes from "./reg_form.css";

function ButtonReg(props) {
  return (
    <div>
      <p className="label_style">
        <button className="reg_button" onClick={props.onClick}>
          Зарегистрироваться
        </button>
      </p>
    </div>
  );
}

export default ButtonReg;
