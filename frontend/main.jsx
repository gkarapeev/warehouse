import React from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import MasterProductList from "./components/MasterProductList/MasterProductList";
import Warehouse from "./components/Warehouse/Warehouse";

const client = new ApolloClient({
	uri: 'http://localhost:4000/',
	cache: new InMemoryCache()
});


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MasterProductList />}></Route>
					<Route path="/warehouse" element={<Warehouse />}></Route>
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>
)