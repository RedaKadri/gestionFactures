/** @type { import("drizzle-kit").Config } */
export default {
	schema: './src/db/schema.ts',
	out: '/drizzle',
	driver: 'better-sqlite',
	dbCredentials: {
		url: 'GDC.db',
	},
};
