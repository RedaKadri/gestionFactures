import { z } from 'zod';

export const RegisterSchema = z
	.object({
		username: z.string().min(2).max(50),
		password: z.string().min(5, { message: 'Password must be at least 8 characters long' }),
		confirmPassword: z.string().min(5, { message: 'Password must be at least 8 characters long' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const LoginSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(5, { message: 'Password must be at least 8 characters long' }),
});

export const ClientSchema = z.object({
	id: z.string(),
	name: z.string(),
	tel: z.string().min(8),
});
