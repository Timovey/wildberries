import type { Knex } from 'knex';

const INDEX_NAME = 'warehouse_name_date_unique';

/**
 * Один склад — одна запись на дату. Индекс нужен для upsert (INSERT ... ON CONFLICT)
 * и защищает от дублей при параллельных запусках сбора.
 */
export async function up(knex: Knex): Promise<void> {
	// Дубли, накопившиеся до появления ограничения: оставляем самую свежую запись (с наибольшим id).
	await knex.raw(`
		DELETE FROM warehouse a
		USING warehouse b
		WHERE a."warehouseName" = b."warehouseName"
			AND a."date" = b."date"
			AND a.id < b.id
	`);

	await knex.schema.alterTable('warehouse', (table) => {
		table.unique(['warehouseName', 'date'], { indexName: INDEX_NAME });
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('warehouse', (table) => {
		table.dropUnique(['warehouseName', 'date'], INDEX_NAME);
	});
}
