import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useMutation, gql } from "@apollo/client";
import "./ProductDialog.css";

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
	const [_, setIsDialogOpen] = useState(false);
	const dialogRef = useRef(null);

	const [name, setName] = useState('');
	const [sizePerUnit, setSizePerUnit] = useState('');

	const openDialog = () => {
		setIsDialogOpen(true);
		dialogRef.current.showModal();
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
		dialogRef.current.close();
	};

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

		closeDialog();
	};

	return (
		<>
			<Button onClick={openDialog}>+ Add Product</Button>

			<dialog ref={dialogRef}>
				<h2>Create Product</h2>

				<form>
					<label htmlFor="productName">Name</label>
					<input
						type="text"
						id="productName"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<label htmlFor="productSize">Size per unit</label>
					<input
						type="number"
						id="productSize"
						value={sizePerUnit}
						onChange={(e) => setSizePerUnit(parseInt(e.target.value))}
					/>
				</form>

				<Button type="button" onClick={handleSubmit}>Create Product</Button>
				<Button onClick={closeDialog}>Close Dialog</Button>
			</dialog>
		</>
	);
};

export default ProductDialog;