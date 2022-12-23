import axios from 'axios';
import { accessTokenPassenger } from '../Components/Authentication/AuthHome';
import useAuth from '../hooks/useAuth';


export const base_url = 'http://localhost:5000/api';


const axiosInstance = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json",
    },
});


export const signInPassenger = (user) => axios.post(`${base_url}/auth/login/user`, user);
export const signInPartner = (partner) => axios.post(`${base_url}/auth/login/carowner`, partner);


axiosInstance.interceptors.request.use(async config => {
    const accessToken = accessTokenPassenger
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});


async function getAccessToken(data) {
    const contactNumber = '017XX'
    const password = 'xyz'

    axios.post('/auth/login/user', data).then(res => {
        const accessToken = res.data.accessToken
        return accessToken
    }).catch(async (error) => {
        if (error.message == 'jwt expired') {
            const { data } = await axios.get('/refreshtoken')
            const newAccessToken = data?.accessToken
            return newAccessToken
        }
    });
}


axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/login/user" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig.sent) {
                originalConfig.sent = true;
                const { data } = await axios.get('/refreshtoken')
                const newAccessToken = data?.accessToken
                originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
            }
        }
    }
);

