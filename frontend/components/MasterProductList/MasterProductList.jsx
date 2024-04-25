import { useQuery, gql } from "@apollo/client";
import { ProductDialog } from "../ProductDialog/ProductDialog"

import ListGroup from "react-bootstrap/ListGroup";

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
			<div className="container-fluid d-flex justify-content-between align-items-center px-0">
				Master Product List
				<ProductDialog refetchProducts={refetch} />
			</div>
			{
				data
				?
				<ListGroup>
					{
						data.productTypes.map((productType, i) => {
							return (
								<ListGroup.Item key={i}>
									ID: {productType.id}, Name: {productType.name}, Size: {productType.sizePerUnit}
								</ListGroup.Item>
							)
						})
					}
				</ListGroup>
				:
				null
			}
		</>
	);
};

export default MasterProductList;