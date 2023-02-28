import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider, redirect} from 'react-router-dom';
import LoginForm from './components/templates/loginPage/login_form';
import RegPage from './components/templates/registration_page/registraion_form';
import Nav from './components/nav';
import ProfilePage from './components/templates/profilePage/profilePage';
import axios, { AxiosError } from 'axios';
import ProfileMenu from './components/profileMenu';
import FriendsListPage from './components/templates/friendsListPage/friendsListPage';
import { AuthProvider, AuthContext } from './components/AuthContext';
import ErrorPage from './components/ErrorPage';
axios.defaults.headers.post['Authorization'] = `Token ${localStorage.getItem('token')}`;

async function redirectAuthUser () {
  
  const token = localStorage.getItem('token')
  
  if (!(token)){
    return null
  }
  const data = axios.post('http://127.0.0.1:8000/users/isauth/')
  .then( function (responce){
    return true
  })
  .catch(function(errors){
    return null
  })
  
  if (data){
    return redirect('users/profile/')
  }
  else{
    return null
  }
}

async function getProfileData() {
  const token = localStorage.getItem('token');
  if (!(token)){
    return redirect('/')
  }
  const responce = axios.post('http://127.0.0.1:8000/users/profile_data/')
  .then (function (responce){
    return responce
  })
  .catch(function (errors){
    return false
  });
  const data = await responce; 
  if (data){
    return data.data
  }
  else{
    return redirect('/')
  }
  
}


async function friendsListLoader({ params }) {
  const responce = axios.post(`http://127.0.0.1:8000/users/friends_list/?page=${params.page_number}`)
  .then(function (responce){
    return responce.data
  })
  .catch(function (error){
    return error
  })
  const data = await responce;
  if (!(data instanceof AxiosError)){              
    return data
  }
  const messageError = data['response']['data']['detail'];
  if (messageError === 'Неправильная страница'){
    data.message = 'Такой страницы не существует!';
    throw data
  }
  else{
    return redirect('/')
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const new_root = createBrowserRouter([
  {
    element: <Nav/>,
    path: '/',
    children:[
      {
        element: <LoginForm />,
        index: true,
        loader: redirectAuthUser
      },
      {
        element: <RegPage />,
        path: 'users/reg/',
      },
      {
        element: <ProfileMenu/>,
        path: 'users/profile/',
        children: [
          {
            element: <ProfilePage/>,
            index: true,
            loader: getProfileData,
          },
          {
            element: <FriendsListPage/>,
            path: 'friendsList/page=:page_number',
            loader: friendsListLoader,
            errorElement: <ErrorPage />,
            
          },
          {
            element: <FriendsListPage/>,
            path: 'messages/username=:username',
          }
        ]
      }

    ]
  }
]
)

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
