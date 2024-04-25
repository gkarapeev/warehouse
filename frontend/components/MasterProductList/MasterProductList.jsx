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
	const { loading, error, data, refetch } = useQuery(GET_DATA);

	useEffect(() => {
		console.log(loading, error, data);
	}, [loading, error, data]);

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

			<ProductDialog refetchProducts={refetch} />
		</>
	);
};

export default MasterProductList;