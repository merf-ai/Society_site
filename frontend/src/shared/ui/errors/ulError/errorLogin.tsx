import React, { useState } from "react";

const css = require('./index.css')

function LogError(props: any) {
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