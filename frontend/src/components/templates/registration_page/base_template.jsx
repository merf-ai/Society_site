import React, { useState } from "react";
import classes from './reg_form.css'

function ButtonReg(props) {

  const loginData = [
    {label: 'email', name: 'email', key: 'login'}
  ]
    return (
      <div >
        <p className="label_style"><button className="reg_button">Зарегистрироваться</button></p>
      </div>
    );
  }

export default ButtonReg