'use Server';

import { desc, eq, ne, sql } from 'drizzle-orm';
import db from '.';
import { FactureTable, clientTable, paymentTable } from './schema';

/**
 * Returns clients that do not have any factures
 */
export async function getClientsWithOFactures(): Promise<any> {
	// Select all clients
	// Left join with factures on client id
	// Group by client id
	// Having count of facture id equal to 0
	return await db
		.select({
			id: clientTable.id,
			clientName: clientTable.name,
			tel: clientTable.tel,
			updatedAt: clientTable.updatedAt,
		})
		.from(clientTable)
		.leftJoin(FactureTable, eq(clientTable.id, FactureTable.clientId))
		.groupBy(clientTable.id)
		.having(sql`count(${FactureTable.id}) = 0`);
}

/**
 * Returns clients with details in a specific year
 * @param {number} year Year of factures
 */
export async function getClientsWithDetails(year: number): Promise<any> {
	// Select all clients
	// Left join with factures on client id
	// Group by facture id
	// Having facture issueYear equal to given year
	return await db
		.select({
			clientId: clientTable.id,
			clientName: clientTable.name,
			clientTel: clientTable.tel,
			FactureTotalAmount: FactureTable.totalAmount,
			FactureIssueYear: FactureTable.issueYear,
			clientPayment: sql`sum(${paymentTable.amount}) as clientPayment`,
			factureStatus: FactureTable.status,
		})
		.from(FactureTable)
		.leftJoin(clientTable, eq(FactureTable.clientId, clientTable.id))
		.leftJoin(paymentTable, eq(FactureTable.id, paymentTable.factureId))
		.groupBy(FactureTable.id)
		.having(eq(FactureTable.issueYear, year));
}

/**
 * Returns client with details
 * @param {string} id Id of client
 */
export async function getClientWithDetails(id: string): Promise<any> {
	// Get client data
	const clientData = await db.select().from(clientTable).where(eq(clientTable.id, id));
	const client = clientData[0];

	// Select all factures
	// Left join with payments on facture id
	// Group by facture id
	// Having facture clientId equal to given id
	// Order by facture issueYear desc
	const factures = await db
		.select({
			id: FactureTable.id,
			clientId: FactureTable.clientId,
			totalAmount: FactureTable.totalAmount,
			clientPayment: sql`sum(${paymentTable.amount}) as clientPayment`,
			issueYear: FactureTable.issueYear,
			status: FactureTable.status,
		})
		.from(FactureTable)
		.leftJoin(paymentTable, eq(FactureTable.id, paymentTable.factureId))
		.groupBy(FactureTable.id)
		.having(eq(FactureTable.clientId, id))
		.orderBy(desc(FactureTable.issueYear));

	// Select all payments
	// Left join with factures on facture id
	// Where facture clientId equal to given id
	// Order by payment updatedAt desc
	const payments = await db
		.select({
			id: paymentTable.id,
			factureId: paymentTable.factureId,
			amount: paymentTable.amount,
			issueYear: FactureTable.issueYear,
			updatedAt: paymentTable.updatedAt,
		})
		.from(paymentTable)
		.leftJoin(FactureTable, eq(FactureTable.id, paymentTable.factureId))
		.where(eq(FactureTable.clientId, id))
		.orderBy(desc(paymentTable.updatedAt));

	return { client, factures, payments };
}

/**
 * Returns years of factures
 */
export async function getYears(): Promise<any> {
	// Select facture issueYear
	// Group by issueYear
	// Order by issueYear desc
	return await db
		.select({ value: FactureTable.issueYear })
		.from(FactureTable)
		.groupBy(FactureTable.issueYear)
		.orderBy(desc(FactureTable.issueYear));
}
