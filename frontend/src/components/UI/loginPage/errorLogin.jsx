import React, { useState } from "react";
import classes from "../registration_page/reg_form.css";

function LogError(props) {
  return (
    <div>
      {props.state ? (
        <div className="errors_list_div">
          <p className="errors_list_p">Данные введены неверно!</p>
        </div>
      ) : null}
    </div>
  );
}

export default LogError;
