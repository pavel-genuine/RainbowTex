import { accessTokenPassenger } from '../Components/Authentication/AuthHome';
import axios from 'axios';
import useAuth from '../Components/hooks/useAuth';

let accessToken

export const base_url = 'http://ec2-13-215-205-56.ap-southeast-1.compute.amazonaws.com/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.withCredentials=true;

const axiosInstance = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json",
    },
});


export const signInPassenger = (user) => axios.post(`${base_url}/auth/login/user`, user);
export const signInPartner = (partner) => axios.post(`${base_url}/auth/login/carowner`, partner);
export const signUpPassenger = (user) => axios.post(`${base_url}/auth/register/user`, user);
export const signUpPartner = (partner) => axios.post(`${base_url}/auth/register/carowner`, partner);

// const accessToken = accessTokenPassenger
axiosInstance.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});



export const getAccessToken=async(data)=> {

    await axios.post(`${base_url}/auth/login/user`, data).then(res => {
        accessToken=res.data.accessToken
        console.log(accessToken);
        // return accessToken
    }).catch(async (error) => {
        // if (error.message == 'jwt expired') {
            const { data } = await axios.get('/refreshtoken')
            accessToken = data?.accessToken
            console.log(accessToken);
            // return accessToken
        // }
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

