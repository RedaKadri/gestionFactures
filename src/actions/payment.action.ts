'use server';

import db from '@/db';
import { FactureTable, paymentTable } from '@/db/schema';
import { PaymentSchema } from '@/types';
import { and, eq, ne, sql } from 'drizzle-orm';
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
				throw new Error('La somme des paiements est supérieure au montant de la facture.');
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

/**
 * Update a payment
 * @param {z.infer<typeof PaymentSchema>} values - The updated payment data
 * @returns {Promise<{ success?: boolean; error?: string; }>} - The response
 */
export async function updatePayment(
	values: z.infer<typeof PaymentSchema>,
): Promise<{ success?: boolean; error?: string }> {
	try {
		await db.transaction(async (tx) => {
			// Update the payment
			// await tx.update(paymentTable).set(values).where(eq(paymentTable.id, values.id));

			// Get the total amount of the facture
			const [facture]: any = await tx
				.select({ totalAmount: FactureTable.totalAmount })
				.from(FactureTable)
				.where(eq(FactureTable.id, values.factureId));

			const [payments]: any = await tx
				.select({
					payments: sql`sum(${paymentTable.amount}) as payments`,
				})
				.from(paymentTable)
				.where(and(eq(paymentTable.factureId, values.factureId), ne(paymentTable.id, values.id)));

			// Check if the new total amount is greater than the facture total amount
			if ((payments.payments || 0) + values.amount > facture.totalAmount) {
				throw new Error('La somme des paiements est supérieure au montant de la facture.');
			}

			await tx.update(paymentTable).set(values).where(eq(paymentTable.id, values.id));

			// Calculate the new status of the facture based on the total amount of payments
			const status = payments.payments + values.amount === facture.totalAmount ? 'payé' : 'en attente';

			// Update the facture status
			await tx.update(FactureTable).set({ status }).where(eq(FactureTable.id, values.factureId));
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

/**
 * Delete a payment
 * @param {string} id - The payment id
 * @returns {Promise<{ success?: boolean; error?: string; }>} - The response
 */
export async function deletePayment(id: string): Promise<{ success?: boolean; error?: string }> {
	try {
		await db.transaction(async (tx) => {
			// Get the id of the facture that the deleted payment belongs to
			const [{ deletedFactureId }] = await tx
				.delete(paymentTable)
				.where(eq(paymentTable.id, id))
				.returning({ deletedFactureId: paymentTable.factureId });

			// Update the status of the facture to "en attente" if it was "payé"
			try {
				await tx
					.update(FactureTable)
					.set({ status: 'en attente' })
					.where(eq(FactureTable.id, deletedFactureId));
			} catch (updateError: any) {
				throw new Error(`Failed to update Facture: ${updateError.message}`);
			}
		});

		return { success: true };
	} catch (error: any) {
		return { error: error.message };
	}
}
