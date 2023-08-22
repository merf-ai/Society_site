import React from "react";
const css = require('./index.css')

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
