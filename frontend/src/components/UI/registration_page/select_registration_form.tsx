import React from "react";
const css = require('./reg_form.css')

interface ISelectRegFormProps {
    name: string,
    label: string,
    select_state: any[]
  }

function SelectRegForm(props: ISelectRegFormProps) {
    const [select_state, set_select_state] = props.select_state

    function change(event: any){
        set_select_state(event.target.value)
    }

    return (
    <div>
    <label className="label_style" htmlFor={props.name}>{props.label}</label>
    <p className="label_style"> 
        <select name={props.name} value={select_state} onChange={change} className='select-reg-form'>
            <option>Мужской</option>
            <option>Женский</option>
        </select>
    </p>
    </div>
    );
  }

export default SelectRegForm