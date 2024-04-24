import { movements, products } from "./_db.js";

export const resolvers = {
	Query: {
		products() {
			return products;
		},
		getMovementsByWarehouse(_, args) {
			return movements.filter(m => m.fromWarehouseId === args.warehouseId || m.toWarehouseId === args.warehouseId);
		}
	}
};
