import { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import Dropdown from "react-bootstrap/Dropdown";

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
				</div>

				<div style={{display: 'flex', gap: '10px'}}>
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
				</div>
			</div>

			<div id="warehouse-stats">
				<span style={{fontWeight: 500}}>Warehouse Stats</span><br />

				{
					selectedWarehouse && warehouseData && (
						<div id="stat-list">
							<span>Product types: {warehouseData.warehouse.stats.productTypeCount}</span>
							<span>Total product count: {warehouseData.warehouse.stats.productCount}</span>
							<span>Total size: {warehouseData.warehouse.stats.totalSize}</span>
							<span>Size used: {warehouseData.warehouse.stats.sizeUsed}</span>
							<span>Size remaining: {warehouseData.warehouse.stats.sizeRemaining}</span>
						</div>
					)
					|| '--'
				}
			</div>

			<div className="app-row header">
				<span className="app-cell id">ID</span>
				<span className="app-cell name">Movement Name</span>
				<span className="app-cell from-to">From - To</span>
				<span className="app-cell date">Date</span>
				<span className="app-cell productName">Product</span>
				<span className="app-cell count">Product Count</span>
			</div>

			{
				selectedWarehouse && warehouseData && (
					<div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', gap: '2px'}}>
						{warehouseData.warehouse.movements.map((movement, index) => (
							<div key={index} className="app-row body">
								<span className="app-cell id">#{movement.id}</span>
								<span className="app-cell name">{movement.name}</span>
								<span className="app-cell from-to">{movement.fromWarehouse.name} ➡️ {movement.toWarehouse.name}</span>
								<span className="app-cell date">🗓 {movement.date}</span>
								<span className="app-cell productName"> {movement.products[0].type.name}</span>
								<span className="app-cell count"> {movement.products.length}</span>
							</div>
						))}
					</div>
				)
				||
				(
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1}}>
						'Please select a warehouse to see its movements and stats'
					</div>
				)
			}
		</>
	);
};

export default Warehouse;