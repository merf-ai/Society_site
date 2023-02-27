import React, {useState } from "react";
import InputRegForm from "../../UI/registration_page/input_registration_form";
import SelectRegForm from "../../UI/registration_page/select_registration_form";
import ButtonReg from "../../UI/registration_page/button_registration";
import ErrorsList from "../../UI/registration_page/errors_list";
import Loader from "../../UI/registration_page/loader";
import axios from "axios";

function RegPage() {
  
  const inputlist = [
    {label: 'Логин', name: 'username', state: useState(''), key: 'login'},
    {label: 'Имя', name: 'first_name', state: useState(''), key: 'name'},
    {label: 'Фамилия(необязательно)', name: 'last_name', state: useState(''), key: 'last_name'},
    {label: 'Отчество(необязательно)', name: 'middle_name', state: useState(''), key: 'middle_name'}, 
    {label: 'email', name: 'email', state: useState(''), key: 'email'},
    {label: 'Пароль', name: 'password', state: useState(''), key: 'password'},
  ]
  
  const select_state = useState('Мужской')
  const [li_state, set_li_state] = useState([])
  const [isListLoaded, setisListLoaded] = useState(false)

  function createuser(event) {
    event.preventDefault()
    setisListLoaded(true)
    axios.post('http://127.0.0.1:8000/users/reg/',
    {
      username: inputlist[0].state[0],
      first_name: inputlist[1].state[0],
      last_name: inputlist[2].state[0],
      middle_name: inputlist[3].state[0],
      email: inputlist[4].state[0],
      password: inputlist[5].state[0],
      sex: select_state[0],

    })
    .then(function (response) {
      let payload = response.data
      if ('errors' in payload){
        set_li_state(Object.entries(payload.errors))
      }
      else{
        set_li_state('success')
        inputlist[0].state[1]('')
        inputlist[1].state[1]('')
        inputlist[2].state[1]('')
        inputlist[3].state[1]('')
        inputlist[4].state[1]('')
        inputlist[5].state[1]('')
    }
    setisListLoaded(false)
  })}

  

    return (
      <div >
        <form method="POST">
          {isListLoaded
          ? <Loader />
          : <ErrorsList state={[li_state, set_li_state]} key='errorList'/>
          }
          {inputlist.map(input => 
            <InputRegForm name={input.name} label={input.label}  key={input.key} state={input.state}/>)}
          <SelectRegForm name={'sex'} label={'Пол'} select_state={select_state} key='sex'/>
          <ButtonReg onClick={createuser}/>
          
          </form>
      </div>
    );
  }

export default RegPage