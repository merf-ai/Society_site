import React, { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import FriendDataList from "../../entities/people/friendsList/friendsList";
import SwitchPage from "../../shared/ui/pageSwitcher/switchPage";
import { TypeFriendListComponentProps } from "./types";
import { TypeDefaultPagination } from "../../shared/types/Pagination";
import { TypePeople } from "../../entities/people/friendsList/types";

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
