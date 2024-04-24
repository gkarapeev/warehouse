export const typeDefs = `#graphql
	type Warehouse {
		id: Int!
		name: String!
		size: Int!
	}

	type Product {
		id: Int!
		name: String!
		sizePerUnit: Int!
	}

	type Movement {
		id: Int!
		name: String!
		fromWarehouseId: Int
		toWarehouseId: Int
		date: String!
		productId: Int!
		productCount: Int!
	}

	type Query {
		products: [Product]
		getMovementsByWarehouse(warehouseId: Int!): [Movement]
	}

	type Mutation {
		createProduct(name: String!, sizePerUnit: Int!): Product
		createMovement(name: String!, fromWarehouseId: Int, toWarehouseId: Int, date: String!, productId: Int!, productCount: Int!): Movement
	}
`;
