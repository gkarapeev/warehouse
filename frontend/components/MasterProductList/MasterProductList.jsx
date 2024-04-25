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
	const { _loading, _error, data, refetch } = useQuery(GET_DATA);

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