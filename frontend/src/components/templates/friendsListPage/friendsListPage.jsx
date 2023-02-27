import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import classes from '../../UI/registration_page/reg_form.css';
import FriendDataList from "../../UI/friendsListPage/friendsList";

function FriendsListPage(props) {
  const freindsList = useLoaderData();

    return (
      <div >
        <ul style={{listStyleType: "none"}}>
          {freindsList['results'].map( function (input){
          return(
            <li>
              <FriendDataList friendData={input} username={input.username}/>
            </li>
                )
              }
            )
          }

        </ul>
      </div>
    );
  }

export default FriendsListPage