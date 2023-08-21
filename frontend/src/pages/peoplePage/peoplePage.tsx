import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import FriendsListPage from "../friendsListPage/friendsListPage";

function PeoplePage() {
  const loaderData = useLoaderData();

    
  return (
    <div>
      <FriendsListPage patternNextPage='../people/_page='/>
    </div>
  );
}

export default PeoplePage;