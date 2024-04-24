export const typeDefs = `#graphql
	type Warehouse {
		id: Int!
		name: String!
		size: Int!
		products: [Product!]
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
		warehouses: [Warehouse]
		warehouseMovements(warehouseId: Int!): [Movement]
	}

	type Mutation {
		createProduct(name: String!, sizePerUnit: Int!): Product
		createMovement(name: String!, fromWarehouseId: Int, toWarehouseId: Int, date: String!, productId: Int!, productCount: Int!): Movement
	}
`;
