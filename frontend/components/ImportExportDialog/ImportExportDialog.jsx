import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import { useMutation, useQuery, useLazyQuery, gql } from "@apollo/client";

const GET_ALL_WAREHOUSES = gql`
	query AllWarehouses {
		warehouses {
			id
			name
		}
	}
`;

const WAREHOUSE_TYPES = gql`
	query WarehouseItemTypes($warehouseId: Int!) {
		warehouse(warehouseId: $warehouseId) {
			name
			id
			productTypes {
				id
				name
				count
			}
		}
	}
`;

const MOVE_PRODUCTS = gql`
	mutation MoveProducts(
		$name: String!
		$fromWarehouseId: Int!
		$toWarehouseId: Int!
		$productTypeId: Int!
		$productCount: Int!
	) {
		moveProducts(
			name: $name
			fromWarehouseId: $fromWarehouseId
			toWarehouseId: $toWarehouseId
			productTypeId: $productTypeId
			productCount: $productCount
		) {
			id
			name
			date
			fromWarehouseId
			toWarehouseId
			productTypeId
			productIds
		}
	}
`;

export const ImportExportDialog = ({ mode, isDisabled, fetchMovements, currentWarehouse }) => {
	const [showDialog, setShowDialog] = useState(false);
	const word = mode === 'import' ? 'Import' : 'Export';
	const icon = mode === 'import' ? '+' : '-';

	const todaysDate = new Date().toISOString().slice(0, 10);

	const [formState, setFormState] = useState({
		fromWarehouse: mode === 'export' ? currentWarehouse : null,
		productType: null,
		productCount: null,
		toWarehouse: mode === 'import' ? currentWarehouse : null,
		movementName: null,
		selectedDate: todaysDate
	});

	const handleInputChange = (newValue) => {
		const [name, value] = Object.entries(newValue)[0];

		setFormState(prevState => {
			const newState = {
				...prevState,
				[name]: value
			};

			return newState;
		});
	};

	useEffect(() => {
		setFormState(prevState => ({
			...prevState,
			fromWarehouse: mode === 'export' ? currentWarehouse : prevState.fromWarehouse,
			toWarehouse: mode === 'import' ? currentWarehouse : prevState.toWarehouse,
		}));
	}, [currentWarehouse]);

	useEffect(() => {
		if (currentWarehouse && mode === 'export') {
			fetchWarehouseTypes({ variables: { warehouseId: currentWarehouse.id } });
		}
	}, [showDialog]);

	const { data, refetch } = useQuery(GET_ALL_WAREHOUSES);
	const [fetchWarehouseTypes, { data: wh_types_data }] = useLazyQuery(WAREHOUSE_TYPES);

	const getAvailableCount = (wh) => {
		fetchWarehouseTypes({ variables: { warehouseId: wh.id } });
	};

	const [moveProducts] = useMutation(MOVE_PRODUCTS, {
		onCompleted: () => {
			fetchMovements();
		}
	});

	const handleSubmit = () => {
		moveProducts({
			variables: {
				name: formState.movementName,
				fromWarehouseId: formState.fromWarehouse.id,
				toWarehouseId: formState.toWarehouse.id,
				productTypeId: formState.productType.id,
				productCount: parseInt(formState.productCount)
			}
		});

		setShowDialog(false);
	};

	return (
		<>
			<Button
				disabled={isDisabled}
				size="sm"
				variant="success" onClick={() => {setShowDialog(true)}}
			>
				{icon} {word}
			</Button>

			{
				currentWarehouse
				&&
				<Modal show={showDialog} onHide={() => setShowDialog(false)} centered>
					<Modal.Header closeButton>
						<Modal.Title>{word} Products</Modal.Title>
					</Modal.Header>


					<Modal.Body>
						<Form>
							<Form.Label htmlFor="from">From</Form.Label>
							{
								mode === 'import'
								?
									<Dropdown>
										<Dropdown.Toggle variant="success" id="dropdown-basic">
											{formState.fromWarehouse?.name || 'Please select'}
										</Dropdown.Toggle>

										<Dropdown.Menu>
											{
												data
												?
												data.warehouses.filter(wh => wh.id !== currentWarehouse.id).map((wh, i) => {
													return (
														<Dropdown.Item
															key={i}
															onClick={() => {
																handleInputChange({ fromWarehouse: wh });
																getAvailableCount(wh);
															}}
															>
																{wh.name}
															</Dropdown.Item>
													)
												})
												:
												null
											}
										</Dropdown.Menu>
									</Dropdown>
								:
									<Form.Control
										type="text"
										id="from"
										value={currentWarehouse.name}
										disabled
									/>
							}

							<Form.Label htmlFor="product">Product</Form.Label>
							<Dropdown id="product" autoFocus>
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									{formState.productType?.name || 'Please select'}
								</Dropdown.Toggle>

								<Dropdown.Menu>
									{
										wh_types_data
										?
										wh_types_data.warehouse.productTypes.map((productType, i) => {
											return (
												<Dropdown.Item
													key={i}
													onClick={() => {handleInputChange({ productType: productType })}}
												>
													{productType.name}
												</Dropdown.Item>
											)
										})
										:
										null
									}
								</Dropdown.Menu>
							</Dropdown>

							{formState.productType && 'Available ' + formState.productType.name + ': ' + formState.productType?.count }<br />

							<Form.Label htmlFor="productCount">Item count</Form.Label>
							<Form.Control
								type="number"
								id="productCount"
								disabled={!formState.productType}
								max={formState.productType?.count}
								onChange={(e) => handleInputChange({ productCount: e.target.value })}
							/>

							<Form.Label htmlFor="to">To</Form.Label>
							{
								mode === 'export'
								?
									<Dropdown>
										<Dropdown.Toggle variant="success" id="dropdown-basic">
											{formState.toWarehouse?.name || 'Please select'}
										</Dropdown.Toggle>

										<Dropdown.Menu>
											{
												data
												?
												data.warehouses.filter(wh => wh.id !== currentWarehouse.id).map((wh, i) => {
													return (
														<Dropdown.Item
															key={i}
															onClick={() => { handleInputChange({ toWarehouse: wh}) }}
														>
															{wh.name}
														</Dropdown.Item>
													)
												})
												:
												null
											}
										</Dropdown.Menu>
									</Dropdown>
								:
									<Form.Control
										type="text"
										id="to"
										value={currentWarehouse.name}
										disabled
									/>
							}

							<Form.Label htmlFor="movementName">Movement Name</Form.Label>
							<Form.Control
								type="text"
								id="movementName"
								onChange={(e) => { handleInputChange({ movementName: e.target.value })} }
							/>

							<Form.Label htmlFor="date">Date of { word }</Form.Label>
							<Form.Control
								type="text"
								id="date"
								value={todaysDate}
								onChange={() => {}}
							/>
						</Form>
					</Modal.Body>

					<Modal.Footer>
						<Button size="sm" variant="secondary" onClick={() => setShowDialog(false)}>
							Close
						</Button>

						<Button
							disabled={
								!formState.fromWarehouse ||
								!formState.productType ||
								!formState.productCount ||
								!formState.toWarehouse ||
								!formState.movementName
							}
							size="sm"
							type="button"
							variant="success"
							onClick={() => handleSubmit()}
						>
							{ word }
						</Button>
					</Modal.Footer>
				</Modal>
			}
		</>
	);
};

export default ImportExportDialog;