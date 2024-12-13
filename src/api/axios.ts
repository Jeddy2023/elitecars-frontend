import axios from "axios";
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    // baseURL: "https://elite-cars-backend.vercel.app/api/v1",
    // baseURL: "https://elite-cars-backend.onrender.com/api/v1",
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('accessTokenEliteCars');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//         const refreshToken = Cookies.get('studentUnionRefreshToken');

//         if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
//             originalRequest._retry = true;
//             try {
//                 const response = await api.post("/auth/refresh", { token: refreshToken });
//                 const { accessToken } = response.data;

//                 Cookies.set('accessToken', accessToken, { expires: 7, secure: true, sameSite: 'Strict' });
//                 api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//                 originalRequest.headers.Authorization = `Bearer ${accessToken}`;

//                 return api(originalRequest);
//             } catch (err) {
//                 console.error('Refresh token failed', err);
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error);
//     }
// );