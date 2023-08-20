import React from "react";
const css = require('./reg_form.css')

function ButtonReg(props: any) {
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
