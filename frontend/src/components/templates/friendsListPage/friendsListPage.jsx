import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import classes from "../../UI/registration_page/reg_form.css";
import FriendDataList from "../../UI/friendsListPage/friendsList";
import SwitchPage from "../../UI/switchPage";

function FriendsListPage({ patternNextPage }) {
  const freindsList = useLoaderData();
  const param = useParams();
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {freindsList["results"].map(function (input) {
          return (
            <li key={input.username}>
              <FriendDataList friendData={input} username={input.username} />
            </li>
          );
        })}
      </ul>
      <SwitchPage
        patternNextPage={patternNextPage}
        numThisPage={param.page_number}
        previosLink={freindsList["previous"]}
        nextLink={freindsList["next"]}
      />
    </div>
  );
}

export default FriendsListPage;
