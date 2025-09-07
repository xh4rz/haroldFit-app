import axios from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL
});

export default axiosClient;
