import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const request = axios.create({
    baseURL: 'https://sekolahpintar.vercel.app/api',
});

request.interceptors.request.use(async (config) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export default request;
