import { z } from 'zod';

export const RegisterSchema = z
	.object({
		username: z.string().min(2).max(50),
		password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
		confirmPassword: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const LoginSchema = z.object({
	username: z.string().min(2).max(50),
	password: z.string().min(5, { message: 'Password must be at least 5 characters long' }),
});

export const ClientSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(3),
	tel: z.string().min(8),
});

export const FacutreSchema = z.object({
	id: z.string().min(1, 'code doit pas être vide'),
	clientId: z.string(),
	totalAmount: z.coerce.number().positive('le montant doit être positif'),
	issueYear: z.number(),
});

export const PaymentSchema = z.object({
	id: z.string().min(1, 'code doit pas être vide'),
	factureId: z.string(),
	amount: z.coerce.number().positive('le montant doit être positif'),
});
