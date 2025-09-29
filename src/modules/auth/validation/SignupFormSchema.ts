import { z } from 'zod';

export const signupFormSchema = z.object({
	name: z.string().min(1, 'Username is required'),
	email: z.email('Invalid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(6, 'Password must be at least 6 characters')
});
