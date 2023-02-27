import axios from "axios";
import React, { createContext, useState } from "react";
export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [isAuth, setIsAuth] = useState(null); 
    const responce = axios.post('http://127.0.0.1:8000/users/isauth/')
    .then (function (response){
      setIsAuth(true);
    })
    .catch (function (errors){
      console.log(errors);
      setIsAuth(false);
    });
    
    const setUserCondition = function (userCondition) {
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
