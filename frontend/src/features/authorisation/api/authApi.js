import { authApi } from '../../../shared/api/authServer';
import api from '../../../shared/api/axios';
import { userApi } from '../../../shared/api/userServer';

export const login = (credentials) => authApi.post('/auth/login', credentials);
export const register = (userData) => authApi.post('/auth/register', userData);
export const getProfile = () => userApi.get('/users/me');
