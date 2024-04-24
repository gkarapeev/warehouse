import { movements, products, warehouses } from "./_db.js";

export const resolvers = {
	Query: {
		products() {
			return products;
		},
		warehouses() {
			return warehouses;
		},
		warehouseMovements(_, args) {
			return movements.filter(m => m.fromWarehouseId === args.warehouseId || m.toWarehouseId === args.warehouseId);
		}
	}
};
