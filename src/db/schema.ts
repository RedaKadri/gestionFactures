import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	username: text('username').notNull().unique(),
	hashPassword: text('hashPassword').notNull(),
	createdAt: integer('created_at').default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer('updated_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, {
			onDelete: 'cascade',
		}),
	expiresAt: integer('expires_at').notNull(),
});

export const clientTable = sqliteTable('client', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	tel: text('tel').notNull(),
	createdAt: integer('created_at').default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer('updated_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const clientRelations = relations(clientTable, ({ many }) => ({
	factures: many(FactureTable),
}));

export const FactureTable = sqliteTable('facture', {
	id: text('id').notNull().primaryKey(),
	clientId: text('client_id')
		.notNull()
		.references(() => clientTable.id, {
			onDelete: 'cascade',
		}),
	status: text('status').notNull().default('en attente'),
	totalAmount: real('total_amount').notNull(),
	issueYear: integer('issue_year').notNull(),
	createdAt: integer('created_at').default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer('updated_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const factureRelations = relations(FactureTable, ({ many, one }) => ({
	client: one(clientTable, {
		fields: [FactureTable.clientId],
		references: [clientTable.id],
	}),
	payments: many(paymentTable),
}));

export const paymentTable = sqliteTable('payment', {
	id: text('id').notNull().primaryKey(),
	factureId: text('facture_id')
		.notNull()
		.references(() => FactureTable.id, {
			onDelete: 'cascade',
		}),
	amount: real('amount').notNull(),
	createdAt: integer('created_at').default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer('updated_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const paymentRelations = relations(paymentTable, ({ one }) => ({
	facture: one(FactureTable, {
		fields: [paymentTable.factureId],
		references: [FactureTable.id],
	}),
}));
