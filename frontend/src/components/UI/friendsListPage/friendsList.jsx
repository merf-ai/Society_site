import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "../registration_page/reg_form.css";

function FriendDataList({ friendData, username }) {
  const translateDict = new Map([
    ["sex", "Пол"],
    ["first_name", "Имя"],
    ["middle_name", "Отчество"],
    ["last_name", "Фамилия"],
  ]);
  return (
    <div>
      <ul
        style={{
          display: "inline-block",
          margin: "10px 10px",
          listStyleType: "none",
        }}
      >
        {Object.entries(friendData).map(function (li) {
          if (li[0] !== "username") {
            return (
              <li key={li[0]}>
                {translateDict.get(li[0])}: {li[1]}
              </li>
            );
          }
        })}
      </ul>
      <Link
        to={`../messages/${username}/`}
        style={{ verticalAlign: "middle", margin: "0px 0px" }}
      >
        Написать сообщение
      </Link>
    </div>
  );
}

export default FriendDataList;
