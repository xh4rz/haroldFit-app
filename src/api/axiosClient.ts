import axios from 'axios';
import { StorageAdapter } from '@/adapters/storage-adapter';
import { delay } from '@/utils';

const axiosClient = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 10000
});

axiosClient.interceptors.request.use(async (config) => {
	await delay(1000);

	const token = await StorageAdapter.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default axiosClient;
