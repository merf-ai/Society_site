import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "axios";


interface IExitLinkProps {
  to : string,
  name : string,
  className ?: string
}

function ExitLink({to, name, className} : IExitLinkProps) {
  const context = useContext(AuthContext) as any;
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