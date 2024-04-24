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
