'use server';
import { z } from 'zod';
import { LoginSchema, RegisterSchema } from '../types';
import { generateId } from 'lucia';
import { cookies } from 'next/headers';
import db from '@/db';
import { userTable } from '@/db/schema';
import { lucia, validateRequest } from '@/lib/auth';
import { Argon2id } from 'oslo/password';
import { eq } from 'drizzle-orm';

export const signUp = async (values: z.infer<typeof RegisterSchema>) => {
	const hashPassword = await new Argon2id().hash(values.password);
	const userId = generateId(15);

	try {
		await db.insert(userTable).values({
			id: userId,
			username: values.username,
			hashPassword,
		});

		const session = await lucia.createSession(userId, {
			expiresIn: 60 * 60 * 6,
		});

		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

		return {
			success: true,
			data: {
				userId,
			},
		};
	} catch (error: any) {
		return {
			error: error?.message,
		};
	}
};

export const signIn = async (values: z.infer<typeof LoginSchema>) => {
	try {
		LoginSchema.parse(values);
	} catch (error: any) {
		return {
			error: error.message,
		};
	}

	const existingUser = await db.query.userTable.findFirst({
		where: (table) => eq(table.username, values.username),
	});

	if (!existingUser) {
		return {
			error: 'User not found',
		};
	}

	if (!existingUser.hashPassword) {
		return {
			error: 'User not found',
		};
	}

	const isValidPassword = await new Argon2id().verify(existingUser.hashPassword, values.password);

	if (!isValidPassword) {
		return {
			error: 'Incorrect username or password',
		};
	}

	const session = await lucia.createSession(existingUser.id, {
		expiresIn: 60 * 60,
	});

	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return {
		success: 'Logged in successfully',
	};
};

export const signOut = async () => {
	try {
		const { session } = await validateRequest();

		if (!session) {
			return {
				error: 'Unauthorized',
			};
		}

		await lucia.invalidateSession(session.id);

		const sessionCookie = lucia.createBlankSessionCookie();

		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	} catch (error: any) {
		return {
			error: error?.message,
		};
	}
};
