import axios from 'axios';
import moment from 'moment';
import { _knex } from '../db';
import { IApiData, IApiWarehouse, IWarehouseEntityInsert } from '../types';

/** Значение, которым WB обозначает отсутствующий тариф. */
const EMPTY_TARIFF = '-';

/**
 * Берём из ответа API только известные колонки таблицы. Раньше объект WB вставлялся целиком,
 * и любое новое поле в ответе давало ошибку "column does not exist" — сбор молча останавливался.
 */
function toWarehouseRow(warehouse: IApiWarehouse, date: string): IWarehouseEntityInsert {
	const value = (field: unknown) =>
		field === undefined || field === null ? EMPTY_TARIFF : String(field);

	return {
		boxDeliveryAndStorageExpr: value(warehouse.boxDeliveryAndStorageExpr),
		boxDeliveryBase: value(warehouse.boxDeliveryBase),
		boxDeliveryLiter: value(warehouse.boxDeliveryLiter),
		boxStorageBase: value(warehouse.boxStorageBase),
		boxStorageLiter: value(warehouse.boxStorageLiter),
		warehouseName: String(warehouse.warehouseName),
		date
	};
}

export default async function () {
	try {
		const now = moment().format('yyyy-MM-DD');
		const wbRes = await axios.get(
			'https://common-api.wildberries.ru/api/v1/tariffs/box',
			{
				headers: {
					Authorization: process.env.AUTH_WB
				},
				params: {
					date: now
				}
			}
		);
		const newData = wbRes.data?.response?.data as IApiData | undefined;
		const rows = (newData?.warehouseList ?? [])
			.filter((warehouse) => Boolean(warehouse?.warehouseName))
			.map((warehouse) => toWarehouseRow(warehouse, now));

		if (!rows.length) {
			console.log('WB вернул пустой список складов, данные не обновлены');
			return;
		}

		// Один атомарный upsert по уникальному ключу (warehouseName, date) вместо
		// «прочитать → UPDATE/INSERT на каждый склад»: без гонок, дублей и N отдельных запросов.
		await _knex<IWarehouseEntityInsert>('warehouse')
			.insert(rows)
			.onConflict(['warehouseName', 'date'])
			.merge();
	} catch (err) {
		console.log(err);
	}
}
