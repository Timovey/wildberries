import axios from 'axios';
import moment from 'moment';
import { _knex } from '../db';
import { IApiData, IWarehouseEntity, IWarehouseEntityInsert } from '../types';

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
		const newData = wbRes.data.response.data as IApiData;

		const existWarehouse = await _knex<IWarehouseEntity>('warehouse')
			.select('*')
			.where('date', now);

		const updatePromises = newData.warehouseList.map((newW) => {
			const exist = existWarehouse.find(
				(el) => el.warehouseName == newW.warehouseName
			);
			if (exist) {
				return _knex<IWarehouseEntity>('warehouse')
					.update(newW)
					.where('id', exist.id);
			}
			newW.date = new Date();

			return _knex<IWarehouseEntityInsert>('warehouse').insert(newW);
		});

		await Promise.all(updatePromises);
	} catch (err) {
		console.log(err);
	}
}
