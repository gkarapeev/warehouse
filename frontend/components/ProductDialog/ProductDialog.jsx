import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutation, gql } from "@apollo/client";

const CREATE_PRODUCT_TYPE = 
	gql`
		mutation CreateProductType($name: String!, $sizePerUnit: Int!) {
			createProductType(name: $name, sizePerUnit: $sizePerUnit) {
				id
				name
				sizePerUnit
			}
		}
	`;

export const ProductDialog = ({ refetchProducts }) => {
	const [show, setShow] = useState(false);

	const [name, setName] = useState('');
	const [sizePerUnit, setSizePerUnit] = useState('');

	const [createProductType] = useMutation(CREATE_PRODUCT_TYPE, {
		onCompleted: () => {
			refetchProducts();
		}
	});

	const handleSubmit = (e) => {
		createProductType({
			variables: {
				name,
				sizePerUnit
			}
		});

		setShow(false);
	};

	return (
		<>
			<Button size="sm" variant="primary" onClick={() => setShow(true)}>+ Add Product</Button>

			<Modal show={show} onHide={() => setShow(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Create Product</Modal.Title>
				</Modal.Header>


				<Modal.Body>
					<Form>
						<Form.Label htmlFor="productName">Name</Form.Label>
						<Form.Control
							type="text"
							id="productName"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoFocus
						/>

						<Form.Label htmlFor="productSize">Size per unit</Form.Label>
						<Form.Control
							type="number"
							id="productSize"
							value={sizePerUnit}
							onChange={(e) => setSizePerUnit(parseInt(e.target.value))}
						/>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button size="sm" variant="secondary" onClick={() => setShow(false)}>
						Close
					</Button>

					<Button size="sm" type="button" variant="primary" onClick={handleSubmit}>
						Create Product
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default ProductDialog;