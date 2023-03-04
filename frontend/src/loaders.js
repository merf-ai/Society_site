import axios from "axios";
import { redirect } from "react-router-dom";
import { AxiosError } from "axios";

export async function redirectAuthUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const data = axios
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
  const data = await responce;
  if (data) {
    return data.data;
  } else {
    return redirect("/");
  }
}

export async function getFriendList({ params }) {
  const responce = axios
    .post(
      `http://127.0.0.1:8000/users/friends_list/?page=${params.page_number}`
    )
    .then(function (responce) {
      return responce.data;
    })
    .catch(function (error) {
      return error;
    });
  const data = await responce;
  if (!(data instanceof AxiosError)) {
    return data;
  }
  const messageError = data["response"]["data"]["detail"];
  if (messageError === "Неправильная страница") {
    data.message = "Такой страницы не существует!";
    throw data;
  } else {
    return redirect('/');
  }
}


export async function getMessages({ params }){
    /*Получаем сообщения юзера, если ошибок не возникло возвращаем их,
    иначе обрабатываем ошибку в зависимости от сообщения в ней
    */
    const responce = await axios.post(`http://127.0.0.1:8000/users/messages/${params.username}`)
    .then (input => input.data)
    .catch (error => error)
    if (!(responce instanceof AxiosError)){
        return responce
    }

    const messageError = responce["response"]["data"]["detail"];
    if(messageError === 'Учетные данные не были предоставлены.'){
        return redirect('/');
    }
    else{
        responce.message = messageError;
        throw responce;
    }

}