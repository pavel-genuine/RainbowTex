import axios from 'axios';
const base_url = 'https://jucundu-server.onrender.com/api';

export const createUser = (user) => axios.post(`${base_url}/auth/register`, user);
export const signInUser = (user) => axios.post(`${base_url}/auth/login`, user);
export const userList = () => axios.get(`${base_url}/admin/userlist`);
export const googleAuth = (user) => axios.get(`${base_url}/auth/google`);
