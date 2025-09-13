import { StorageAdapter } from '@/adapters/storage-adapter';
import { User } from '@/infrastructure/interfaces';
import { create } from 'zustand';
import { authCheckStatus, authLogin, authRegister } from '../services/auth';

export interface AuthStoreState {
	isAuthenticated: boolean;
	token?: string;
	user?: User;
	login: (email: string, password: string) => Promise<boolean>;
	register: (name: string, email: string, password: string) => Promise<boolean>;
	checkStatus: () => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()((set, get) => ({
	isAuthenticated: false,
	token: undefined,
	user: undefined,
	login: async (email: string, password: string) => {
		const resp = await authLogin(email, password);

		if (!resp) {
			set({ isAuthenticated: false, token: undefined, user: undefined });
			return false;
		}

		await StorageAdapter.setItem('token', resp.token);

		set({ isAuthenticated: true, token: resp.token, user: resp.user });

		return true;
	},
	register: async (name: string, email: string, password: string) => {
		const resp = await authRegister(name, email, password);

		if (!resp) {
			return false;
		}

		await StorageAdapter.setItem('token', resp.token);

		set({ isAuthenticated: true, token: resp.token, user: resp.user });

		return true;
	},
	checkStatus: async () => {
		const resp = await authCheckStatus();

		if (!resp) {
			set({ isAuthenticated: false, token: undefined, user: undefined });
			return;
		}

		await StorageAdapter.setItem('token', resp.token);

		set({ isAuthenticated: true, token: resp.token, user: resp.user });
	},
	logout: async () => {
		await StorageAdapter.removeItem('token');

		set({ isAuthenticated: false, token: undefined, user: undefined });
	}
}));
