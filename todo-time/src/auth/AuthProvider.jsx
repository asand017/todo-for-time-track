import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts";
import { login, register } from "../api/apiService";
import useToken from "../custom_hooks/useToken";

const setUserIdToStorage = (id) => {
  localStorage.setItem("user_id", id);
};

const loginUser = async (creds) => {
  const res = await login(creds);
  setUserIdToStorage(res.data.id);
  return res.data.token;
};

const registerUser = async (reg) => {
  const res = await register(reg);
  setUserIdToStorage(res.data.id);
  return res.data.token;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken, clearToken } = useToken();

  const handleNav = (route) => {
    const origin = location.state?.from?.pathname || route;
    navigate(origin);
  };

  const handleRegister = async (e, reg) => {
    e.preventDefault();
    console.log("register new user");
    const tok = await registerUser(reg);
    console.log("completed registration:", tok);
    setToken(tok);
    navigate("./dashboard");
  };

  const handleLogin = async (e, cred) => {
    e.preventDefault();
    const tok = await loginUser(cred);
    console.log(tok);
    setToken(tok);

    handleNav("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    clearToken();
    setToken(null);
    handleNav("/login");
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
