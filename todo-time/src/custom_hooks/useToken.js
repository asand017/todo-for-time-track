/**
 *  SHOULD NOT BE CALLED DIRECTLY. Access token via useAuth hook.
 */
import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = tokenString;
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
  };

  return {
    setToken: saveToken,
    clearToken: clearToken,
    token,
  };
}
