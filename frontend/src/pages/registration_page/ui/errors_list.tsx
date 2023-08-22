import React from "react";
const css = require('./index.css')

function ErrorsList(props: any) {
  const [li_state, set_li_state] = props.state;

  let translate_map = new Map([
    ["username", "Логин"],
    ["first_name", "Имя"],
    ["last_name", "Фамилия"],
    ["middle_name", "Отчество"],
    ["email", "email"],
    ["password", "Пароль"],
  ]);

  let bu;

  if (li_state.length === 0) {
    bu = "";
  } else if ("success" === li_state) {
    bu = (
      <div className="errors_list_div_success">
        <p className="errors_list_p_success">
          Вы успешно зарегистрированы, подтвердите почту!
        </p>
      </div>
    );
  } else {
    bu = (
      <div className="errors_list_div">
        {li_state.map((li: any) => (
          <ul key={li} className="errors_list_ul">
            <p key={li[0]} className="errors_list_p">
              {" "}
              {translate_map.get(li[0])}{" "}
            </p>
            {li[1].map((li: any) => (
              <li className="errors_list_li">{li}</li>
            ))}
          </ul>
        ))}
      </div>
    );
  }

  return <div>{bu}</div>;
}

export default ErrorsList;
