import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import classes from "../../UI/registration_page/reg_form.css";
import FriendDataList from "../../UI/friendsListPage/friendsList";

function FriendsListPage(props) {
  const freindsList = useLoaderData();
  const param = useParams();
  const num_next_page = Number(param.page_number) + 1;
  const num_prev_page = Number(param.page_number) - 1;

  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {freindsList["results"].map(function (input) {
          return (
            <li>
              <FriendDataList friendData={input} username={input.username} />
            </li>
          );
        })}
      </ul>
      <div>
        {freindsList["previous"] ? (
          <Link to={`../friendsList/page=${num_prev_page}`}>
            Предыдущая страница
          </Link>
        ) : null}
        {freindsList["next"] ? (
          <Link to={`../friendsList/page=${num_next_page}`}>
            Следующая страница
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default FriendsListPage;
