'use Server';

import { desc, eq, sql } from 'drizzle-orm';
import db from '.';
import { FactureTable, clientTable, paymentTable } from './schema';

export async function getClients(year: number): Promise<any> {
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

export async function getClient(id: string): Promise<any> {
	const clientData = await db.select().from(clientTable).where(eq(clientTable.id, id));
	const client = clientData[0];

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

	return { client, factures };
}

export async function getYears(): Promise<any> {
	return await db
		.select({ value: FactureTable.issueYear })
		.from(FactureTable)
		.groupBy(FactureTable.issueYear)
		.orderBy(desc(FactureTable.issueYear));
}
