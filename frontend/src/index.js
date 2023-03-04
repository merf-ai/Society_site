import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./components/templates/loginPage/login_form";
import RegPage from "./components/templates/registration_page/registraion_form";
import Nav from "./components/nav";
import ProfilePage from "./components/templates/profilePage/profilePage";
import axios from "axios";
import ProfileMenu from "./components/profileMenu";
import FriendsListPage from "./components/templates/friendsListPage/friendsListPage";
import { AuthProvider, AuthContext } from "./components/AuthContext";
import ErrorPage from "./components/ErrorPage";
import MessagePage from "./components/templates/messagesPage/messagePage";
import { redirectAuthUser, getProfileData, getFriendList, getMessages} from "./loaders";

axios.defaults.headers.post["Authorization"] = `Token ${localStorage.getItem(
  "token"
)}`;




const root = ReactDOM.createRoot(document.getElementById("root"));

const new_root = createBrowserRouter([
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
            element: <FriendsListPage />,
            path: "friendsList/page=:page_number",
            loader: getFriendList,
            errorElement: <ErrorPage />,
          },
          {
            element: <MessagePage />,
            path: "messages/username=:username",
            loader: getMessages,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={new_root} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
