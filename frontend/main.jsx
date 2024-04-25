import React from "react";
import ReactDOM from "react-dom/client"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { MasterProductList } from "./components/MasterProductList/MasterProductList";

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache()
});


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<MasterProductList></MasterProductList>
		</ApolloProvider>
	</React.StrictMode>
)