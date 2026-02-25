import { User } from './';

export interface AuthResponse {
	user: User;
	token: string;
}
