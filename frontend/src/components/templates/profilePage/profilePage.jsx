import React from "react";
import { useLoaderData } from "react-router-dom";
import classes from "../../UI/registration_page/reg_form.css";

function ProfilePage() {
  const userData = useLoaderData();
  const translation_object = {
    sex: "Пол",
    first_name: "Имя",
    last_name: "Фамилия",
    middle_name: "Отчество",
  };
  const arr = Object.entries(userData);

  return (
    <div>
      <ul style={{ display: "inline-block" }}>
        {arr.map(function (input) {
          if (input[0] !== "is_auth") {
            return (
              <li className="profile-menu-li" key={input[0]}>
                {translation_object[input[0]]} : {input[1]}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default ProfilePage;
