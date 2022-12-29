import { accessTokenPassenger } from '../Components/Authentication/AuthHome';
import axios from 'axios';
import useAuth from '../Components/hooks/useAuth';

let accessToken

// export const base_url = 'http://ec2-13-215-205-56.ap-southeast-1.compute.amazonaws.com/api';
export const base_url = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const signInPassenger = (user) => axios.post(`${base_url}/auth/login/user`, user);
export const signInPartner = (partner) => axios.post(`${base_url}/auth/login/carowner`, partner);
export const signUpPassenger = (user) => axios.post(`${base_url}/auth/register/user`, user);
export const signUpPartner = (partner) => axios.post(`${base_url}/auth/register/carowner`, partner);
export const getRefreshToken = () => axios.get('/refreshtoken')
export const optVerifier = () => axios.post('/auth/otp-login')


export const getAccessToken = async (data) => {
    await signInPassenger(data).then(res => {
        accessToken = res.data.accessToken
        console.log(accessToken, 'acToken');
        // return accessToken
    }).catch(async (error) => {
        // if (error.message == 'jwt expired') {
        const { data } = await getRefreshToken()
        accessToken = data?.accessToken
        console.log(accessToken, 'refTnk');
        // return accessToken
        // }
    });
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    console.log(accessToken, 'accessT');
}


// const axiosInstance = axios.create({
//     baseURL: base_url,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // const accessToken = accessTokenPassenger
// axiosInstance.interceptors.request.use(async config => {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
// });


// axiosInstance.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         const originalConfig = err.config;

//         if (originalConfig.url !== "/auth/login/user" && err.response) {
//             // Access Token was expired
//             if (err.response.status === 401 && !originalConfig.sent) {
//                 originalConfig.sent = true;
//                 const { data } = await axios.get('/refreshtoken')
//                 const newAccessToken = data?.accessToken
//                 originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
//             }
//         }
//     }
// );

