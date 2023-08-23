import axios from "axios";
import React, { createContext, useState } from "react";
export const AuthContext = createContext(null) as any;


export function AuthProvider({children}: any) {
    const [isAuth, setIsAuth] = useState(false); 
    const responce = axios.post('http://127.0.0.1:8000/users/isauth/')
    .then (function (response){
      setIsAuth(true);
    })
    .catch (function (errors){
      setIsAuth(false);
    });
    
    const setUserCondition = function (userCondition: boolean) {
      setIsAuth(userCondition);
    }
    return (
      <div >
        <AuthContext.Provider value={{isAuth, setUserCondition}}>
          {children}
        </AuthContext.Provider>
      </div>
    );
  }
