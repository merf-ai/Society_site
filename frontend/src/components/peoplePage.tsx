import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import FriendsListPage from "./templates/friendsListPage/friendsListPage";

const css = require('./UI/nav/navCss.css')

function PeoplePage() {
  const loaderData = useLoaderData();

    
  return (
    <div>
      <FriendsListPage patternNextPage='../people/_page='/>
    </div>
  );
}

export default PeoplePage;