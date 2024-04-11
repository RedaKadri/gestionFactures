'use server';

import db from '@/db';
import { FactureTable, paymentTable } from '@/db/schema';
import { PaymentSchema } from '@/types';
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';

/**
 * Create a payment for a facture
 * @param {z.infer<typeof PaymentSchema>} values - The payment data
 * @returns {Promise<{ success?: boolean; error?: string; }>}
 */
export async function createPayment(
	values: z.infer<typeof PaymentSchema>,
): Promise<{ success?: boolean; error?: string }> {
	try {
		await db.transaction(async (tx) => {
			// Get the total amount of the facture
			const [facture]: any = await tx
				.select({ totalAmount: FactureTable.totalAmount })
				.from(FactureTable)
				.where(eq(FactureTable.id, values.factureId));

			// Get the total amount of payments for this facture
			const [payments]: any = await tx
				.select({
					payments: sql`sum(${paymentTable.amount}) as payments`,
				})
				.from(paymentTable)
				.where(eq(paymentTable.factureId, values.factureId));

			// Check if the new total amount is greater than the facture total amount
			if ((payments.payments || 0) + values.amount > facture.totalAmount) {
				throw new Error('Le montant de la facture est insuffisant');
			}

			// Calculate the new status of the facture based on the total amount of payments
			const status = payments.payments + values.amount === facture.totalAmount ? 'payé' : 'en attente';

			// Update the facture status
			await tx.update(FactureTable).set({ status }).where(eq(FactureTable.id, values.factureId));

			// Insert the new payment
			await tx.insert(paymentTable).values(values).returning();
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
