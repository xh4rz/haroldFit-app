import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.email('Invalid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(5, 'Password must be at least 5 characters')
});
