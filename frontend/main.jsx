import React from "react";
import ReactDOM from "react-dom/client"
import { App } from "./App";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache()
});

client.query({
	query:
		gql`
			query WarehousesWithProductsAndTypes {
				warehouses {
					id
					name
					products {
						id
						type {
							name
							sizePerUnit
						}
					}
				}
			}
		`
}).then(r => console.log(r.data));

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)