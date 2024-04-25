let productTypes = [
	{ id: 1, name: "Hat", sizePerUnit: 2 },
	{ id: 2, name: "Pants", sizePerUnit: 6 }
];

let products = [
	{ id: 1, productTypeId: 1, warehouseId: 2 },
	{ id: 2, productTypeId: 2, warehouseId: 1 },
	{ id: 3, productTypeId: 2, warehouseId: 3 },
	{ id: 4, productTypeId: 2, warehouseId: 3 },
];

let warehouses = [
	{
		id: 1,
		name: "Sofia",
		size: 100,
	},
	{
		id: 2,
		name: "Plovdiv",
		size: 20,
	},
	{
		id: 3,
		name: "Mezek",
		size: 7,
	},
];

let movements = [
	{
		id: 1,
		name: "Move hats Sf to Pld",
		fromWarehouseId: 1,
		toWarehouseId: 2,
		date: "2023-09-25",
		productTypeId: 1,
		productIds: [1],
	},
	{
		id: 2,
		name: "Move pants Pld to Sf",
		fromWarehouseId: 2,
		toWarehouseId: 1,
		date: "2023-12-25",
		productTypeId: 2,
		productIds: [2],
	},
	{
		id: 3,
		name: "Move pants Sf to Mz",
		fromWarehouseId: 1,
		toWarehouseId: 3,
		date: "2023-12-25",
		productTypeId: 2,
		productIds: [3, 4],
	},
];

export const db = {
	productTypes,
	products,
	warehouses,
	movements
};