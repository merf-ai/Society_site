import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import classes from './UI/nav/navCss.css';
import FriendsListPage from "./templates/friendsListPage/friendsListPage";

function PeoplePage(props) {
  const loaderData = useLoaderData();

    
  return (
    <div>
      <FriendsListPage patternNextPage='../people/_page='/>
    </div>
  );
}

export default PeoplePage;