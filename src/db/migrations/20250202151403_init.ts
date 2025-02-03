import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('warehouse', function (table) {
		table.increments('id');
		table.string('boxDeliveryAndStorageExpr', 255).notNullable();
		table.string('boxDeliveryBase', 255).notNullable();
		table.string('boxDeliveryLiter', 255).notNullable();
		table.string('boxStorageBase', 255).notNullable();
		table.string('boxStorageLiter', 255).notNullable();
		table.string('warehouseName', 255).notNullable();
		table.date('date').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('warehouse');
}
