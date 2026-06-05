{/*import axios from 'axios';

const authserver = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://90.188.118.51:8000/api',
  headers: { 'Content-Type': 'application/json' },
});
const userserver = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://90.188.118.51:8080/api',
  headers: { 'Content-Type': 'application/json' },
});
//localhost
//192.168.31.192
// Добавляем токен в заголовки, если он есть
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;*/}