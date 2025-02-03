import knex, { Knex } from 'knex';
import knexConfig from './knexfile';

const _knex = knex(knexConfig.development as Knex.Config);

export { _knex };
