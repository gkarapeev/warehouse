export const typeDefs = `#graphql
	type WarehouseStats {
		productTypeCount: Int
		productCount: Int
		totalSize: Int
		sizeUsed: Int
		sizeRemaining: Int
	}

	type Warehouse {
		id: Int!
		name: String!
		size: Int!
		products: [Product!]
		movements: [Movement!]
		stats: WarehouseStats
	}

	type ProductType {
		id: Int!
		name: String!
		sizePerUnit: Int!
	}

	type Product {
		id: Int!
		type: ProductType!
	}

	type Movement {
		id: Int!
		name: String!
		fromWarehouseId: Int # nullable because that's an easy way to just fill new products for testing
		toWarehouseId: Int!
		productTypeId: Int!
		productIds: [Int!]!
		date: String!
		fromWarehouse: Warehouse!
		toWarehouse: Warehouse!
		products: [Product!]!
	}

	type Query {
		productTypes: [ProductType]
		products: [Product]
		warehouses: [Warehouse]
		warehouse(warehouseId: Int!): Warehouse
	}

	type Mutation {
		createProductType(name: String!, sizePerUnit: Int!): ProductType
		moveProducts(name: String!, fromWarehouseId: Int!, toWarehouseId: Int!, productTypeId: Int!, productIds: [Int!]!): Movement
	}
`;
