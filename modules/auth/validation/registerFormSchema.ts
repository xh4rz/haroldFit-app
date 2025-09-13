import { z } from 'zod';

export const registerFormSchema = z.object({
	name: z.string().min(1, 'Username is required'),
	email: z.email('Invalid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(5, 'Password must be at least 5 characters')
});
