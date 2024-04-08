'use server';

import db from '@/db';
import { FactureTable } from '@/db/schema';
import { FacutreSchema } from '@/types';
import { z } from 'zod';

export const createFacture = async (values: z.infer<typeof FacutreSchema>): Promise<any> => {
	try {
		await db.insert(FactureTable).values(values).returning();
		return {
			success: true,
		};
	} catch (error: any) {
		return {
			error: error.message,
		};
	}
};
