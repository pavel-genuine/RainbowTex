import axios from 'axios';
let token

// export const base_url = 'http://ec2-13-215-205-56.ap-southeast-1.compute.amazonaws.com/api';
// export const base_url = 'http://localhost:5000/api';
export const base_url = 'https://testapi.jucundu.com/api';
axios.defaults.withCredentials = true;

export const otpLogin = (data) => axios.post(`${base_url}/auth/otp-login`, data)
export const getRefreshToken = () => axios.get(`${base_url}/auth/refreshtoken`, { withCredentials: true })

export const refreshToken = () => {
    // const { data } = await getRefreshToken()
    // console.log(data?.accessToken,'ref-tkn');
    // return  data?.accessToken   
    // let token;
    // const getToken = async () => {
    //     const { data } = await getRefreshToken();
    //     return  data;
    // }
    // token = getToken();
    // console.log(token,'tkn');
    // return token;

    return getRefreshToken().then(data => {  return data; })
}

// const token = await refreshToken() 
const config = {
    headers: { Authorization: `Bearer ${refreshToken()}` }
};

export const logOut = () => axios.get(`${base_url}/auth/logout`, { withCredentials: true })
export const carOwnerProfileUpdate = (data) => axios.patch(`${base_url}/carowner/update_profile`, data, config);
export const passengerProfileUpdate = (data) => axios.patch(`${base_url}/user/profile`, data, config);
export const submitCarOwnerNID = (data) => axios.post(`${base_url}/carowner/nid`, data, config);
export const addCar = (data) => axios.post(`${base_url}/carowner/car`, data, config);
export const uploadCarImage = (data) => axios.post(`${base_url}/carowner/car/picture`, data, config);
export const uploadCarFitnessPaper = (data) => axios.post(`${base_url}/carowner/car/fitnesspaper`, data, config);
export const uploadCarTaxToken = (data) => axios.post(`${base_url}/carowner/car/fitnesspaper`, data, config);
export const addDriver = (data) => axios.post(`${base_url}/carowner/create_driver`, data, config);
export const carOwnerProfile = () => axios.get(`${base_url}/carowner/profile`, config);
export const carOwnerAllCars = () => axios.get(`${base_url}/carowner/car`, config);
export const carOwnerCarUpdate = (data, id) => axios.patch(`${base_url}/carowner/car/${id}`, data, config);
export const carOwnerCarDelete = (id) => axios.delete(`${base_url}/carowner/car/${id}`, config);
export const carOwnerAssignDriver = (data) => axios.patch(`${base_url}/carowner/assign_driver`, data, config);
export const carOwnerSingleCarDetail = (id) => axios.get(`${base_url}/carowner/car/${id}`, config);
export const carOwnerAllDrivers = () => axios.get(`${base_url}/carowner/drivers`);
export const findCars = (params) => axios.get(`${base_url}/user/inquiry${params}`);
export const SingleCarDetail = (id) => axios.get(`${base_url}/car/details/${id}`, config);



// export const getAccessToken = async (data) => {

//     await otpLogin(data).then(res => {
//         accessToken = res.data.accessToken
//         console.log(accessToken, 'acToken api');
//         return accessToken
//     }).catch(async (error) => {
//         // if (error.message == 'jwt expired') {
//         const { data } = await getRefreshToken()
//         accessToken = data?.accessToken
//         console.log(accessToken, 'refTnk');
//         return accessToken
//         // }
//     });
//     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//     console.log(accessToken, 'accessT');
// }

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

