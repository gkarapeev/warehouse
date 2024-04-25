import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

const GET_DATA = 
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
	`;

export const App = () => {
	const { loading, error, data } = useQuery(GET_DATA);

	useEffect(() => {
		console.log(loading, error, data);
	});

	return (
		<>
			App works!
		</>
	)
};