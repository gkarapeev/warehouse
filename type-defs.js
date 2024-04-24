export const typeDefs = `#graphql
	type Warehouse {
		id: Int!
		name: String!
		size: Int!
		products: [Product!]
		movements: [Movement!]
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
		fromWarehouse: Warehouse!
		toWarehouse: Warehouse!
		date: String!
		product: Product!
		productCount: Int!
	}

	type Query {
		productTypes: [ProductType]
		products: [Product]
		warehouses: [Warehouse]
		warehouse(warehouseId: Int!): Warehouse
	}

	type Mutation {
		createProduct(name: String!, sizePerUnit: Int!): Product
		createMovement(name: String!, fromWarehouseId: Int, toWarehouseId: Int, date: String!, productId: Int!, productCount: Int!): Movement
	}
`;
