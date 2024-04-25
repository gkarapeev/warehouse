import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { ProductDialog } from "../ProductDialog/ProductDialog"

// const GET_DATA = 
// 	gql`
// 		query AllProductTypes {
// 			productTypes {
// 				id
// 				name
// 				sizePerUnit
// 			}
// 		}
// 	`;

export const Warehouse = () => {
	// const { loading, error, data, refetch } = useQuery(GET_DATA);

	// useEffect(() => {
	// 	console.log(loading, error, data);
	// }, [loading, error, data]);

	return (
		<>
			Warehouse Page
		</>
	);
};

export default Warehouse;