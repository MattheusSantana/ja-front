import { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, loginService } from "../services/api";
export const AuthContext = createContext(0);

export const AuthenticatorProvider =  ({children}) => {
  const [user, setUser] = useState(null);
  const [loginMessage, setloginMessage] = useState("");
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();


  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if(loggedUser){
      setUser(JSON.parse(loggedUser));
    }
    setLoading(false);
  }, []);


  const login = async (username, password) => {

    try {
        const response = await loginService(username, password);

        if(response.status === 200){

          const { user, token } = response.data;
          setUser(user);
          
          localStorage.setItem('loggedUser', JSON.stringify(user));
          localStorage.setItem('token', token);

          api.defaults.headers.Authorization = `Bearer ${token}`;

          navigate("/home");

        }


      } catch (error) {
        
        if (error.response.status === 401){
          console.log('loginMessage', loginMessage);
          setloginMessage(<p>{error.response.data.message}</p>);
          setUser(null);
        }

        console.log(error);
    }

  };



  return (
    <AuthContext.Provider
      value={{
        authenticated: Boolean(user),
        user,
        loading,
        loginMessage,
        login,
      }}>
        {children}
    </AuthContext.Provider>
  );
};
