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
	Movement: {
		products(parent) {
			return db.products.filter(p => parent.productIds.some(id => id === p.id));
		},
		fromWarehouse(parent) {
			return db.warehouses.find(wh => wh.id === parent.fromWarehouseId);
		},
		toWarehouse(parent) {
			return db.warehouses.find(wh => wh.id === parent.toWarehouseId);
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
		},
		moveProducts(_, args) {
			args.productIds.forEach(productId => db.products.find(p => p.id === productId).warehouseId = args.toWarehouseId);

			const biggestId = Math.max(...db.productTypes.map(t => t.id));
			const newId = biggestId + 1;

			const newMovement = {
				id: newId,
				name: args.name,
				date: new Date().toISOString().slice(0, 10),
				fromWarehouseId: args.fromWarehouseId,
				toWarehouseId: args.toWarehouseId,
				productTypeId: args.productTypeId,
				productIds: args.productIds
			};

			db.movements = [ ...db.movements, newMovement ];

			return newMovement;
		}
	}
};
