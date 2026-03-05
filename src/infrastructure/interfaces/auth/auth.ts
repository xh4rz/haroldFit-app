import { User } from '..';

export interface Auth {
	user: User;
	token: string;
}
