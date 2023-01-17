import axios from 'axios';


// export const base_url = 'http://ec2-13-215-205-56.ap-southeast-1.compute.amazonaws.com/api';
// export const base_url = 'http://localhost:5000/api';
export const base_url = 'https://testapi.jucundu.com/api';
axios.defaults.withCredentials = true;

export const otpLogin = (data) => axios.post(`${base_url}/auth/otp-login`, data)
export const adminLogin = (data) => axios.post(`${base_url}/auth/login/admin`, data)
export const adminRegister = (data) => axios.post(`${base_url}/auth/register/admin`, data)
export const getRefreshToken = () => axios.get(`${base_url}/auth/refreshtoken`, { withCredentials: true })

const axiosInstance = axios.create({
    baseURL: base_url,
    withCredentials: true
});

axiosInstance.interceptors.request.use(async config => {
    const { data } = await getRefreshToken()
    const newAccessToken = data?.accessToken
    config.headers.Authorization = `Bearer ${newAccessToken}`;
    return config;
},
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    res => res,
    async (error) => {
        const originalConfig = error.config;
        // Access Token was expired
        if (error?.response?.status === 401 && !originalConfig?.sent) {
            originalConfig.sent = true;
            const { data } = await getRefreshToken()
            const newAccessToken = data?.accessToken
            originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalConfig)
        }
        else return Promise.reject(error)
    }
);

export const logOut = () => axios.get(`${base_url}/auth/logout`, { withCredentials: true })
export const carOwnerProfileUpdate = (data) => axiosInstance.patch(`/carowner/profile`, data);
export const passengerProfileUpdate = (data) => axiosInstance.patch(`/user/profile`, data );
export const driverProfileUpdate = (data) => axiosInstance.patch(`/driver/profile`, data );
export const submitCarOwnerNIDFront = (data) => axiosInstance.patch(`/carowner/nidfront`, data );
export const submitCarOwnerNIDBack = (data) => axiosInstance.patch(`/carowner/nidback`, data );
export const submitDriverNIDFront = (data) => axiosInstance.patch(`/driver/nidfront`, data );
export const submitDriverNIDBack = (data) => axiosInstance.patch(`/driver/nidback`, data );
export const addCar = (data) => axiosInstance.post(`/carowner/car`, data );
export const uploadCarImage = (data) => axiosInstance.patch(`/carowner/car/picture`, data );
export const uploadCarRegistrationPaper = (data) => axiosInstance.patch(`/carowner/car/registration`, data );
export const uploadCarFitnessPaper = (data) => axiosInstance.patch(`/carowner/car/fitnesspaper`, data );
export const uploadCarTaxToken = (data) => axiosInstance.patch(`/carowner/car/taxtoken`, data );
export const addDriver = (data) => axiosInstance.post(`/carowner/create_driver`, data );
export const carOwnerProfile = () => axiosInstance.get(`/carowner/profile` );
export const passengerProfile = () => axiosInstance.get(`/user/profile` );
export const driverProfile = () => axiosInstance.get(`/driver/profile` );
export const carOwnerAllCars = () => axiosInstance.get(`/carowner/car` );
export const carOwnerCarUpdate = (data, id) => axiosInstance.patch(`${base_url}/carowner/car/${id}`, data );
export const carOwnerCarDelete = (id) => axiosInstance.delete(`${base_url}/carowner/car/${id}` );
export const carOwnerAssignDriver = (data) => axiosInstance.patch(`${base_url}/carowner/assign_driver`, data );
// export const carOwnerSingleCarDetail = (id) => axiosInstance.get(`${base_url}/carowner/car/${id}` );
export const carOwnerAllDrivers = () => axiosInstance.get(`/carowner/drivers`);
export const passengerFindCars = (params) => axiosInstance.get(`${base_url}/user/inquiry${params}`);
export const SingleCarDetail = (id) => axiosInstance.get(`${base_url}/car/details/${id}` );
export const passengerBookingRequest = (data) => axiosInstance.post(`${base_url}/user/booking_request`,data );


