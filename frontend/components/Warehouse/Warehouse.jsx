import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { ProductDialog } from "../ProductDialog/ProductDialog"
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

import "./Warehouse.css";
import ImportExportDialog from "../ImportExportDialog/ImportExportDialog";

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
			name
			id
			stats {
				productTypeCount
				productCount
				totalSize
				sizeUsed
				sizeRemaining
			}
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
	const [fetchMovements, { data: warehouseData, loading: movementsLoading, error: movementsError }] = useLazyQuery(GET_WAREHOUSE_MOVEMENTS);

	const handleWarehouseChange = (wh) => {
		setselectedWarehouse(wh);
		fetchMovements({ variables: { warehouseId: wh.id } });
	};

	const updateMovements = () => {
		fetchMovements({
			variables: {
				warehouseId: selectedWarehouse.id
			},
			fetchPolicy: 'network-only'
		})
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

				<ImportExportDialog
					mode="import"
					isDisabled={!selectedWarehouse}
					fetchMovements={updateMovements}
					currentWarehouse={selectedWarehouse}
				/>

				<ImportExportDialog
					mode="export"
					isDisabled={!selectedWarehouse}
					fetchMovements={updateMovements}
					currentWarehouse={selectedWarehouse}
				/>

				<div id="warehouse-stats">
					<span style={{fontWeight: 500}}>Warehouse Stats</span><br />

					{
						selectedWarehouse && warehouseData && (<span style={{fontSize: 11}}>
							Product types: {warehouseData.warehouse.stats.productTypeCount}<br />
							Total product count: {warehouseData.warehouse.stats.productCount}<br />
							Total size: {warehouseData.warehouse.stats.totalSize}<br />
							Size used: {warehouseData.warehouse.stats.sizeUsed}<br />
							Size remaining: {warehouseData.warehouse.stats.sizeRemaining}
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
					selectedWarehouse && warehouseData && (
						<div>
							{warehouseData.warehouse.movements.map((movement, index) => (
								<div key={index}>
									<span>#{movement.id}</span> |
									<span>{movement.name}</span> |
									<span>{movement.fromWarehouse.name} ➡️ {movement.toWarehouse.name}</span> |
									<span>🗓 {movement.date}</span> |
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