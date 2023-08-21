import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import FriendDataList from "../../components/UI/friendsListPage/friendsList";
import SwitchPage from "../../components/UI/switchPage";
import { TypeFriendListComponentProps } from "./types";
import { TypePeople } from "../../types/modelTypes/user";
import { TypeDefaultPagination } from "../../types/Pagination";

function FriendsListPage({ patternNextPage } : TypeFriendListComponentProps) {
  const freindsList = useLoaderData() as TypePeople & TypeDefaultPagination;
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
