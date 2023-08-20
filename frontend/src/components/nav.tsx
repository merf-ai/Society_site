import React, { useContext, useState } from "react";
import { Link, Outlet, redirect, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import ExitLink from "./ExitLink";

type TypeLink = {
  name: string,
  to: string
}

const css = require('./UI/nav/navCss.css')

function Nav() {
  const authContext = useContext(AuthContext) as any;
  let menu: TypeLink[] = [];
  
  if (authContext['isAuth'] === true) {
    menu = [
      {name: 'Регистрация', to: '/users/reg'},
      {name: 'Профиль', to: '/users/profile'},
      {name: 'Люди', to: 'users/people'},
      {name: 'О нас', to: 'users/about'},
      {name: 'Выход', to: '/'},
  ];
  }
  else if (authContext['isAuth'] === false){
    menu = [
      {name: 'Регистрация', to: '/users/reg'},
      {name: 'О нас', to: 'users/about'},
      {name: 'Вход', to: '/'},
  ];
  }
  else if (authContext['isAuth'] === null){
    menu = [
      {name: 'О нас', to: 'users/about'},
    ]
  }
    
    return (
      <div >
        <ul className="ul-nav" style={{position: 'fixed', top: '0px'}}>
            {
              menu.map(function (input){
                if (input.name === 'Выход'){
                  return(
                  <li className="li-nav" key={input.name}>
                    <ExitLink to={input.to} name={input.name} className='link-nav'/> 
                  </li>)
                }
                return (
                <li className="li-nav" key={input.name}>
                  <Link to={input.to} className='link-nav'> 
                    {input.name}
                  </Link>
                </li>
                      )
                  }
                )
            }
        </ul>
        <div style={{marginTop: '100px'}}>
        <Outlet></Outlet>
        </div>
      </div>
    );
  }

export default Nav