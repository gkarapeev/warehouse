import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { ProductDialog } from "../ProductDialog/ProductDialog"
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import "./Warehouse.css";

const GET_WAREHOUSES = gql`
	query Warehouses {
		warehouses {
			id
			name
		}
	}
`;

const GET_WAREHOUSE_MOVEMENTS = gql`
	query WarehouseMovements($warehouseId: Int!) {
		warehouse(warehouseId: $warehouseId) {
			movements {
				name
				date
				id
				fromWarehouse {
					name
				}
				toWarehouse {
					name
				}
				products {
					type {
						name
					}
				}
			}
		}
	}
`;

export const Warehouse = () => {
	const { loading, error, data, refetch } = useQuery(GET_WAREHOUSES);
	const [selectedWarehouse, setselectedWarehouse] = useState(null);
	const [fetchMovements, { data: movementsData, loading: movementsLoading, error: movementsError }] = useLazyQuery(GET_WAREHOUSE_MOVEMENTS);

	const handleWarehouseChange = (wh) => {
		setselectedWarehouse(wh);
		fetchMovements({ variables: { warehouseId: wh.id } });
	};

	return (
		<>
			<div id="warehouse-nav">
				<div style={{display: 'flex'}}>
					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							Warehouse: {selectedWarehouse?.name || 'Please select'}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							{
								data
								?
								data.warehouses.map((wh, i) => {
									return (
										<Dropdown.Item key={i} onClick={() => handleWarehouseChange(wh)}>{wh.name}</Dropdown.Item>
									)
								})
								:
								null
							}
						</Dropdown.Menu>
					</Dropdown>
					<span onClick={() => setselectedWarehouse(null)} style={{cursor: 'pointer'}}>[ X ]</span>
				</div>

				<Button disabled={!selectedWarehouse} size="sm" variant="success">+ Import</Button>

				<Button disabled={!selectedWarehouse} size="sm" variant="success">- Export</Button>

				<div id="warehouse-stats">
					<span style={{fontWeight: 500}}>Warehouse Stats</span><br />

					{
						selectedWarehouse && (<span style={{fontSize: 11}}>
							Product types: 6<br />
							Total product count: 87<br />
							Size used: 124<br />
							Size remaining: 136
						</span>)
						|| '--'
					}
				</div>
			</div>

			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<span>Movement ID</span>
				<span>Movement Name</span>
				<span>From</span>
				<span>To</span>
				<span>Date</span>
				<span>Product Name</span>
				<span>Product Count</span>
			</div>

			<div>
				{
					selectedWarehouse && movementsData && (
						<div>
							{movementsData.warehouse.movements.map((movement, index) => (
								<div key={index}>
									<span>#{movement.id}</span> |
									<span>{movement.name}</span> |
									<span>{movement.fromWarehouse.name} ➡️ {movement.toWarehouse.name}</span> |
									<span>🗓 {movement.date}</span> |
									<span> {movement.date}</span> |
									<span> {movement.products[0].type.name}</span> |
									<span> {movement.products.length}</span> |
								</div>
							))}
						</div>
					)
					|| 'Please select a warehouse to see its movements and stats'
				}

			</div>
		</>
	);
};

export default Warehouse;