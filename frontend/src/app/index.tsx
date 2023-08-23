import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "../reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "../pages/loginPage/login_form";
import RegPage from "../pages/registration_page/registraion_form";
import Nav from "../widgets/defaultNav/nav";
import ProfilePage from "../pages/profilePage/profilePage";
import axios from "axios";
import ProfileMenu from "../widgets/profileMenu/profileMenu";
import FriendsListPage from "../pages/friendsListPage/friendsListPage";
import { AuthProvider, AuthContext } from "../shared/context/authContext/AuthContext";
import ErrorPage from "../pages/errorPage/ErrorPage";
import MessagePage from "../pages/messagesPage/messagePage";
import { redirectAuthUser, getProfileData, getFriendList, getMessages, getPeopleList} from "./forLoader/loaders";
import PeoplePage from "../pages/peoplePage/peoplePage";
import { createRoot } from 'react-dom/client';

axios.defaults.headers.post["Authorization"] = `Token ${localStorage.getItem(
  "token"
)}`;

const container = document.getElementById('root')!;
const root = createRoot(container);


export const new_root = createBrowserRouter([
  {
    element: <Nav />,
    path: "/",
    children: [
      {
        element: <LoginForm />,
        index: true,
        loader: redirectAuthUser,
      },
      {
        element: <RegPage />,
        path: "users/reg/",
      },
      {
        element: <ProfileMenu />,
        path: "users/profile/",
        children: [
          {
            element: <ProfilePage />,
            index: true,
            loader: getProfileData,
          },
          {
            element: <FriendsListPage patternNextPage='../friendsList/page='/>,
            path: "friendsList/:page_number/",
            loader: getFriendList,
            errorElement: <ErrorPage />,
          },
          {
            element: <MessagePage />,
            path: "messages/:username/",
            loader: getMessages,
            errorElement: <ErrorPage />,
          },
          {
            element: <PeoplePage />,
            path: "people/:page_number/",
            loader: getPeopleList,
            errorElement: <ErrorPage />,
          }
        ],
      },
    ],
  },
]);

export function renderApp() {
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={new_root} />
      </AuthProvider>
    </React.StrictMode>
  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
