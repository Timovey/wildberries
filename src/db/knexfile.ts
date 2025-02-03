import type { Knex } from 'knex';
const host = 'postgresdb';
import 'dotenv/config';

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'pg',
		connection: {
			host: process.env.DB_HOST ?? host,
			port: Number(process.env.DB_PORT ?? 5432),
			user: process.env.DB_USER ?? 'postgres',
			database: process.env.DB_NAME ?? 'wildberries',
			password: process.env.DB_PSD ?? 'postgres'
		},
		migrations: {
			extension: 'ts',
			directory: __dirname + '/migrations',
			tableName: 'migrations_history'
		}
	}
};

// module.exports = config;
export default config;
