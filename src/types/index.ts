export interface IWarehouseEntity {
	id: number;
	boxDeliveryAndStorageExpr: string;
	boxDeliveryBase: string;
	boxDeliveryLiter: string;
	boxStorageBase: string;
	boxStorageLiter: string;
	warehouseName: string;
	date: Date;
}

export interface IWarehouseEntityInsert extends Omit<IWarehouseEntity, 'id'> {}

export interface IApiData {
	dtNextBox: Date;
	dtTillMax: Date;
	warehouseList: IWarehouseEntityInsert[];
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
