import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import MasterProductList from "../MasterProductList/MasterProductList";
import Warehouse from "../Warehouse/Warehouse";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Stack from "react-bootstrap/Stack";
import "bootstrap/dist/css/bootstrap.min.css"

import "./App.css";

export const App = () => {
	return (
		<BrowserRouter>
			<Navbar expand="sm" className="bg-body-tertiary px-4">
				<Navbar.Brand as={NavLink} to="/" >📦 Warehouse</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse id="basic-navbar-nav">
					<Stack direction="horizontal" gap={3} className="ms-auto">
						<Nav.Link as={NavLink} className="app-nav-link rounded-1 px-3 py-1" to="/">Master Product List</Nav.Link>
						<Nav.Link as={NavLink} className="app-nav-link rounded-1 px-3 py-1" to="/warehouse">Warehouse</Nav.Link>
					</Stack>
				</Navbar.Collapse>
			</Navbar>

			<div className="container-fluid px-4 py-2 d-flex flex-column gap-2 flex-grow-1">
				<Routes>
					<Route path="/" element={<MasterProductList />}></Route>
					<Route path="/warehouse" element={<Warehouse />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
};