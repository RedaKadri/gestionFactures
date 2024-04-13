'use server';

import db from '@/db';
import { FactureTable, paymentTable } from '@/db/schema';
import { FacutreSchema } from '@/types';
import { eq, sql } from 'drizzle-orm';
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

/**
 * Update a facture
 * @param {z.infer<typeof FacutreSchema>} values - The facture data
 * @returns {Promise<{ success?: boolean; error?: string; }>} - The response
 */
export async function updateFacture(
	values: z.infer<typeof FacutreSchema>,
): Promise<{ success?: boolean; error?: string }> {
	try {
		await db.transaction(async (tx) => {
			// Get the total amount of payments for this facture
			const [facturePayments]: any = await tx
				.select({ payments: sql`sum(${paymentTable.amount}) as payments` })
				.from(paymentTable)
				.where(eq(paymentTable.factureId, values.id));

			if (facturePayments.payments > values.totalAmount) {
				throw new Error('Le montant de la facture est insuffisant');
			}

			const status = facturePayments.payments === values.totalAmount ? 'payé' : 'en attente';

			await tx
				.update(FactureTable)
				.set({ ...values, status })
				.where(eq(FactureTable.id, values.id));
		});

		return {
			success: true,
		};
	} catch (error: any) {
		return {
			error: error.message,
		};
	}
}

export async function deleteFacture(id: string) {
	try {
		await db.delete(FactureTable).where(eq(FactureTable.id, id));
		return {
			success: true,
		};
	} catch (error: any) {
		return {
			error: error.message,
		};
	}
}
