import { db } from "./_db.js";

export const resolvers = {
	Query: {
		productTypes() {
			return db.productTypes;
		},
		products() {
			return db.products;
		},
		warehouses() {
			return db.warehouses;
		},
		warehouse(_, args) {
			return db.warehouses.find(w => w.id === args.warehouseId);
		}
	},
	Warehouse: {
		movements(parent) {
			return db.movements.filter(m => m.fromWarehouseId === parent.id || m.toWarehouseId === parent.id);
		},
		products(parent) {
			return db.products.filter(p => p.warehouseId === parent.id)
		}
	},
	Product: {
		type(parent) {
			return db.productTypes.find(t => t.id === parent.productTypeId)
		}
	},
	Mutation: {
		createProductType(_, args) {
			const biggestId = Math.max(...db.productTypes.map(t => t.id));
			const newId = biggestId + 1;
			const newType = {
				id: newId,
				name: args.name,
				sizePerUnit: args.sizePerUnit
			};

			db.productTypes = [
				...db.productTypes,
				newType
			];

			return newType;
		}
	}
};
