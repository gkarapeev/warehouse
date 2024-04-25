import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import MasterProductList from "../MasterProductList/MasterProductList";
import Warehouse from "../Warehouse/Warehouse";

import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"

export const App = () => {
	return (
		<BrowserRouter>
			<Navbar expand="sm" className="bg-body-tertiary px-4">
				<Navbar.Brand as={Link} to="/" >📦 Warehouse</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse id="basic-navbar-nav">
					
				</Navbar.Collapse>
			</Navbar>

			<div className="container-fluid px-4 py-2">
				<Routes>
					<Route path="/" element={<MasterProductList />}></Route>
					<Route path="/warehouse" element={<Warehouse />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
};