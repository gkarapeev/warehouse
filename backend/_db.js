let productTypes = [
	{ id: 1, name: "Hat", sizePerUnit: 2 },
	{ id: 2, name: "Pants", sizePerUnit: 6 }
];

let products = [
	{ id: 1, productTypeId: 1, warehouseId: 2 },
	{ id: 2, productTypeId: 2, warehouseId: 1 }
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
];

let movements = [
	{
		id: 1,
		name: "Move hats 1 to 2",
		fromWarehouseId: 1,
		toWarehouseId: 2,
		date: "2023-09-25",
		productId: 1,
		productCount: 1,
	},
	{
		id: 2,
		name: "Move pants 2 to 1",
		fromWarehouseId: 2,
		toWarehouseId: 1,
		date: "2023-12-25",
		productId: 2,
		productCount: 1,
	},
];

export const db = {
	productTypes,
	products,
	warehouses,
	movements
};