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
			return db.products.filter(pr => pr.warehouseId === parent.id);
		},
		productTypes(parent) {
			const allTypeIds = db.products.filter(pr => pr.warehouseId === parent.id).map(pr => pr.productTypeId);
			const uniqueTypeIds = [ ...new Set(allTypeIds)];
			return uniqueTypeIds.map(typeId => ({
				...db.productTypes.find(type => type.id === typeId),
				count: db.products.filter(pr => pr.warehouseId === parent.id && pr.productTypeId === typeId).length
			}));
		},
		stats (parent) { // this will be an aggregation query in reality
			const products = db.products.filter(p => p.warehouseId === parent.id);
			const sizeUsed = products.reduce((total, product) => total + (db.productTypes.find(type => type.id === product.productTypeId).sizePerUnit || 0), 0);

			return {
				productTypeCount: new Set(products.map(product => product.productTypeId)).size,
				productCount: products.length,
				totalSize: parent.size,
				sizeUsed: sizeUsed,
				sizeRemaining: parent.size - sizeUsed
			}
		}
	},
	Product: {
		type(parent) {
			return db.productTypes.find(t => t.id === parent.productTypeId)
		}
	},
	ProductType: {
		warehouses(parent) {
			const products = db.products.filter(p => p.productTypeId === parent.id);
			const warehouseIds = [ ...new Set(products.map(pr => pr.warehouseId)) ];
			return warehouseIds.map(whId => db.warehouses.find(wh => wh.id === whId));
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
			const allRelevantProducts = db.products.filter(pr => pr.warehouseId === args.fromWarehouseId && args.productTypeId === pr.productTypeId);
			const selectedProductIds = allRelevantProducts.slice(0, args.productCount).map(pr => pr.id);

			// Change the `warehouseId` of each corresponding item in the db
			selectedProductIds.forEach(productId => db.products.find(p => p.id === productId).warehouseId = args.toWarehouseId);

			const biggestId = Math.max(...db.movements.map(t => t.id));
			const newId = biggestId + 1;

			const newMovement = {
				id: newId,
				name: args.name,
				date: new Date().toISOString().slice(0, 10),
				fromWarehouseId: args.fromWarehouseId,
				toWarehouseId: args.toWarehouseId,
				productTypeId: args.productTypeId,
				productIds: selectedProductIds
			};

			db.movements = [ ...db.movements, newMovement ];

			return newMovement;
		}
	}
};
