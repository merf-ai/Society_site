import React, { useContext, useState } from "react";
import InputRegForm from "../../UI/registration_page/input_registration_form";
import Loader from "../../UI/registration_page/loader";
import classes from '../../UI/registration_page/reg_form.css'
import axios from "axios";
import LogError from "../../UI/loginPage/errorLogin";
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";


function LoginForm() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const loginData = [
    {label:'email или логин', name: 'username', state: useState(''), key: 'email'},
    {label:'Пароль', name: 'password', state: useState(''), key: 'password'}
  ];

  const [isListLoaded, setisListLoaded] = useState(false);
  const [isError, setErrorState] = useState(false);

  function login(event) {
    event.preventDefault();
    setisListLoaded(true);
    const responce = axios.post('http://127.0.0.1:8000/users/login/', 
    {
      username: loginData[0]['state'][0],
      password: loginData[1]['state'][0]
    })
    .then(function (response) {
      let payload = response.data;
      localStorage.setItem('token', payload.token);
      authContext['setUserCondition'](true);
      setErrorState(false);
      axios.defaults.headers.post['Authorization'] = `Token ${localStorage.getItem('token')}`;
      return navigate('/users/profile/');
    })
    .catch(function (error){
      setErrorState(true);
      authContext['setUserCondition'](false);
  }
    )
    .finally(function (){
      setisListLoaded(false);
    })
  };

    return (
      <div className="log-div">
        {
          isListLoaded ? <Loader /> : <LogError state={isError}/>
        }
        {
          loginData.map(input => 
            <InputRegForm name={input.name} label={input.label}  key={input.key} state={input.state}/>)
        }
        <p className="label_style"><button className="reg_button" onClick={login}>Войти</button></p>
      </div>
    );
  }

export default LoginForm