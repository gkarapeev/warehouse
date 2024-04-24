const HAT = { id: 1, name: "Hat", sizePerUnit: 2 };
const PANTS = { id: 2, name: "Pants", sizePerUnit: 6 };

export const products = [
	HAT,
	PANTS,
];

export const warehouses = [
	{
		id: 1,
		name: "Sofia",
		size: 100,
		products: [
			PANTS
		]
	},
	{
		id: 2,
		name: "Plovdiv",
		size: 20,
		products: [
			HAT
		]
	},
];

export const movements = [
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
