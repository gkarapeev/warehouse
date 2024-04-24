import { productTypes, products, movements, warehouses } from "./_db.js";

export const resolvers = {
	Query: {
		productTypes() {
			return productTypes;
		},
		products() {
			return products;
		},
		warehouses() {
			return warehouses;
		},
		warehouse(_, args) {
			return warehouses.find(w => w.id === args.warehouseId);
		}
	},
	Warehouse: {
		movements(parent) {
			return movements.filter(m => m.fromWarehouseId === parent.id || m.toWarehouseId === parent.id);
		},
		products(parent) {
			return products.filter(p => p.warehouseId === parent.id)
		}
	},
	Product: {
		type(parent) {
			return productTypes.find(t => t.id === parent.productTypeId)
		}
	}
};
