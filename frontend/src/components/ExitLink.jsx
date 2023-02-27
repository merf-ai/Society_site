import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from './UI/nav/navCss.css';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

function ExitLink({to, name, className}) {
  const context = useContext(AuthContext);
  function tokenDelete() {
    localStorage.removeItem('token');
    context['setUserCondition'](false);
    axios.defaults.headers.post['Authorization'] = null;
  }
  return (
      <Link to={to}  className={className} onClick={tokenDelete}>{name}</Link>
    );
  }

export default ExitLink