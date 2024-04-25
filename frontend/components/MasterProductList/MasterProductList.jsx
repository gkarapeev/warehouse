import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { ProductDialog } from "../ProductDialog/ProductDialog"

const GET_DATA = 
	gql`
		query AllProductTypes {
			productTypes {
				id
				name
				sizePerUnit
			}
		}
	`;

export const MasterProductList = () => {
	const { loading, error, data } = useQuery(GET_DATA);

	useEffect(() => {
		console.log(loading, error, data);
	});

	return (
		<>
			Master Product List
			{
				data
				?
				data.productTypes.map((productType, i) => {
					return <div key={i}>ID: {productType.id}, Name: {productType.name}, Size: {productType.sizePerUnit}</div>
				})
				:
				null
			}

			<ProductDialog />
		</>
	);
};

export default MasterProductList;