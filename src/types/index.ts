export interface IWarehouseEntity {
	id: number;
	boxDeliveryAndStorageExpr: string;
	boxDeliveryBase: string;
	boxDeliveryLiter: string;
	boxStorageBase: string;
	boxStorageLiter: string;
	warehouseName: string;
	/** Дата в формате YYYY-MM-DD (колонка типа date). */
	date: Date | string;
}

export interface IWarehouseEntityInsert extends Omit<IWarehouseEntity, 'id'> {}

/**
 * Склад в ответе API WB. Набор полей WB со временем расширяет, поэтому лишние поля допускаются,
 * а в БД попадают только известные колонки.
 */
export interface IApiWarehouse
	extends Partial<Omit<IWarehouseEntity, 'id' | 'date'>> {
	[field: string]: unknown;
}

export interface IApiData {
	dtNextBox: Date;
	dtTillMax: Date;
	warehouseList: IApiWarehouse[];
}

export const headers = [
	'Коэффициент, %',
	'Доставка 1 литра, ₽',
	'Доставка каждого дополнительного литра, ₽',
	'Хранение 1 литра, ₽',
	'Хранение каждого дополнительного литра, ₽',
	'Название склада'
];

export type HeadersType =
	| 'Коэффициент, %'
	| 'Доставка 1 литра, ₽'
	| 'Доставка каждого дополнительного литра, ₽'
	| 'Хранение 1 литра, ₽'
	| 'Хранение каждого дополнительного литра, ₽'
	| 'Название склада';

export interface IWarehouseSheetData extends Omit<IWarehouseEntity, 'id' | 'date'> {}

export const warehouseSheetCompare: Record<keyof IWarehouseSheetData, HeadersType> = {
	boxDeliveryAndStorageExpr: 'Коэффициент, %',
	boxDeliveryBase: 'Доставка 1 литра, ₽',
	boxDeliveryLiter: 'Доставка каждого дополнительного литра, ₽',
	boxStorageBase: 'Хранение 1 литра, ₽',
	boxStorageLiter: 'Хранение каждого дополнительного литра, ₽',
	warehouseName: 'Название склада'
};
