import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useResizeMarginRight } from "../../shared/hocs/resizeHoc";

const css = require('./index.css')

function ProfileMenu() {
  let profileMenuRef = useRef(null);
  const margin = useResizeMarginRight(profileMenuRef);
  
  const profileLinks = [
    ["Мои друзья", "friendsList/1/"],
    ["Сообщения", "#"],
    ["Поиск людей", "people/1/"],
  ];

  const loginData = [{ label: "email", name: "email", key: "login" }];
  return (
    <div>
      <ul className="profile-menu-ul" style={{'position': 'fixed', 'left': '240px'}} ref={profileMenuRef}>
        {profileLinks.map((input) => (
          <li className="profile-menu-li" key={input[0]}>
            <Link className="profile-menu-a" to={input[1]}>
              {input[0]}
            </Link>
          </li>
        ))}
      </ul>
      <div className="profile-menu-ul" style={{marginLeft: `${margin}px`}}>
        <Outlet />
      </div>
    </div>
    
  );
}

export default ProfileMenu;
