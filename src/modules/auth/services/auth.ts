import axiosClient from '@/api/axiosClient';
import { AuthResponse, User } from '@/infrastructure/interfaces';

const returnUserToken = (data: AuthResponse) => {
	const user: User = {
		id: data.id,
		email: data.email,
		fullName: data.fullName,
		isActive: data.isActive,
		roles: data.roles
	};

	return {
		user: user,
		token: data.token
	};
};

export const authLogin = async (email: string, password: string) => {
	email = email.toLowerCase();

	try {
		const { data } = await axiosClient.post<AuthResponse>('/auth/login', {
			email,
			password
		});

		return returnUserToken(data);
	} catch (error) {
		console.error({ error: error.response.data });
		const objectError = {
			message: error.response.data.error,
			status: error.response.status
		};

		throw new Error(JSON.stringify(objectError));
	}
};

export const authRegister = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const { data } = await axiosClient.post<AuthResponse>('/auth/register', {
			fullName: name,
			email,
			password
		});

		return returnUserToken(data);
	} catch (error) {
		console.error({ error: error.response.data });
		const objectError = {
			message: error.response.data.error,
			status: error.response.status
		};

		throw new Error(JSON.stringify(objectError));
	}
};

export const authCheckStatus = async () => {
	try {
		const { data } = await axiosClient.get<AuthResponse>('/auth/check-status');

		return returnUserToken(data);
	} catch (error) {
		console.error(error);
		return null;
	}
};
