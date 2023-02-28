import React, { useState } from "react";
import classes from "./UI/nav/navCss.css";
import { Link, Outlet } from "react-router-dom";

function ProfileMenu() {
  const profileLinks = [
    ["Мои друзья", "friendsList/page=1"],
    ["Сообщения", "#"],
    ["Поиск людей", "#"],
  ];
  const loginData = [{ label: "email", name: "email", key: "login" }];
  return (
    <div>
      <ul className="profile-menu-ul">
        {profileLinks.map((input) => (
          <li className="profile-menu-li">
            <Link className="profile-menu-a" to={input[1]}>
              {input[0]}
            </Link>
          </li>
        ))}
      </ul>
      <div className="profile-menu-ul">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileMenu;
