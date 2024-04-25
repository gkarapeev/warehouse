import { useState, useRef } from "react";
import "./ProductDialog.css";

export const ProductDialog = () => {
	const [_, setIsDialogOpen] = useState(false);
	const dialogRef = useRef(null);

	const openDialog = () => {
		setIsDialogOpen(true);
		dialogRef.current.showModal();
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
		dialogRef.current.close();
	};

	return (
		<>
			<button onClick={openDialog}>Open Dialog</button>

			<dialog ref={dialogRef}>
				<h2>Create Product</h2>

				<form>
					<label htmlFor="productName">Name</label>
					<input type="text" id="productName" placeholder="Sweater" />

					<label htmlFor="productSize">Size per unit</label>
					<input type="number" id="productSize" />
				</form>

				<button onClick={closeDialog}>Close Dialog</button>
			</dialog>
		</>
	);
};

export default ProductDialog;