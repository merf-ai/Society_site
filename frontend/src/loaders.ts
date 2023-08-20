import axios from "axios";
import { redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { dataHandler, sendDefaultPostRequest } from "./extra_logic/forLoaders";

export async function redirectAuthUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const data = await axios
    .post("http://127.0.0.1:8000/users/isauth/")
    .then(function (responce) {
      return true;
    })
    .catch(function (errors) {
      return null;
    });

  if (data) {
    return redirect("users/profile/");
  } else {
    return null;
  }
}

export async function getProfileData() {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const responce = axios
    .post("http://127.0.0.1:8000/users/profile_data/")
    .then(function (responce) {
      return responce;
    })
    .catch(function (errors) {
      return false;
    });
  const data = await responce as any;
  if (data) {
    return data.data;
  } else {
    return redirect("/");
  }
}

export async function getFriendList({ params } : any) {
  const responce = await sendDefaultPostRequest(
    `http://127.0.0.1:8000/users/friends_list/?page=${params.page_number}`
  );

  return dataHandler(responce);
}

export async function getMessages({ params } : any) {
  const responce = await sendDefaultPostRequest(
    `http://127.0.0.1:8000/users/messages/${params.username}`
  );

  return dataHandler(responce);
}

/*Получаем список друзей, если пользователь не зарегистрирован,
  происходит редирек на страницу входа*/
export async function getPeopleList({ params }: any){
  
  const responce = await sendDefaultPostRequest(`http://127.0.0.1:8000/users/people/?page=${params.page_number}`)

  return dataHandler(responce);
}
