'use server';

import db from '@/db';
import { clientTable } from '@/db/schema';
import { ClientSchema } from '@/types';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export async function createClient(values: z.infer<typeof ClientSchema>) {
	try {
		const client = await db.insert(clientTable).values(values).returning({ id: clientTable.id });
		return {
			id: client[0].id,
			success: true,
		};
	} catch (error: any) {
		return {
			error: error.message,
		};
	}
}

export async function updateClient(values: z.infer<typeof ClientSchema>) {
	try {
		await db.update(clientTable).set(values).where(eq(clientTable.id, values.id));

		return {
			success: true,
		};
	} catch (error: any) {
		return {
			error: error.message,
		};
	}
}

export async function deleteClient(id: string) {
	try {
		await db.delete(clientTable).where(eq(clientTable.id, id));
		return {
			success: true,
		};
	} catch (error: any) {
		return {
			error: error.message,
		};
	}
}
