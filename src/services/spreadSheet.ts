import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import moment from 'moment';
import { _knex } from '../db';
import { headers, IWarehouseSheetData, warehouseSheetCompare } from '../types';

export default async function () {
	try {
		const now = moment().format('yyyy-MM-DD');
		const warehouses = await _knex<IWarehouseSheetData>('warehouse')
			.select('*')
			.where('date', now);

		const sheetId = process.env.GOOGLE_SHEET_ID ?? '';
		const serviceAccountAuth = new JWT({
			keyFile: 'credentials.json',
			scopes: ['https://www.googleapis.com/auth/spreadsheets']
		});
		const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
		await doc.loadInfo();

		let sheet = doc.sheetsByTitle[now];
		if (!sheet) {
			sheet = await doc.addSheet({
				title: now,
				headerValues: headers
			});
		}
		// без await очистка могла выполниться уже после addRows и стереть свежие данные
		await sheet.clearRows();
		await sheet.setHeaderRow(headers);

		const rows = warehouses.map((warehouse) => {
			const obj: any = {};

			Object.entries(warehouse).forEach(([key, value]) => {
				const typedKey = key as keyof IWarehouseSheetData;
				if (warehouseSheetCompare[typedKey]) {
					obj[warehouseSheetCompare[typedKey]] = value;
				}
			});
			return obj;
		});
		await sheet.addRows(rows);
	} catch (err) {
		console.log(err);
	}
}
