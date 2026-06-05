import axios from "axios";

export const createApi = (baseURL) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")||
  sessionStorage.getItem("token");
console.log("REQUEST URL:", config.baseURL + config.url);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
};