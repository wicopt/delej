import React, { createContext, useEffect, useState, useContext } from "react";
import {
  login as apiLogin,
  getProfile,
  register as apiRegister,
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem('token');
    if (token) {
      getProfile()
        .then((response) => setUser(response.data))
        .catch(() => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  //метод входа
  const login = async (credentials) => {
    const response = await apiLogin(credentials);
    const { token, user } = response.data;
    const storage = credentials.rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", token);
    setUser(user);
    return user;
  };
  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
  };
  const register = async (userData) => {
    const response = await apiRegister(userData);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setUser(user);
    return user;
  };
  // Значения, которые будут доступны через контекст
  const value = { user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
