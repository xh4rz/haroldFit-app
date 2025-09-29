import axios from 'axios';
import { StorageAdapter } from '@/adapters/storage-adapter';

const axiosClient = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

axiosClient.interceptors.request.use(async (config) => {
	const token = await StorageAdapter.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default axiosClient;
