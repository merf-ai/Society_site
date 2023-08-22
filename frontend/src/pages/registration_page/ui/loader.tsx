import React from "react";
const css = require('./index.css')

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      <div className="loader">
        <h1>Загрузка</h1>
      </div>
    </div>
  );
}

export default Loader;
