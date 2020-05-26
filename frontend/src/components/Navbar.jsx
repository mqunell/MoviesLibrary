import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

function hideNavbar() {
	if (window.innerWidth <= 575) {
		document.getElementsByClassName('navbar-toggler')[0].click()
	}
}

const MyNavbar = () => (
	<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
		<Navbar.Brand as={NavLink} to="/">Movies Library</Navbar.Brand>
		
		<Navbar.Toggle aria-controls="responsive-navbar-nav" />
		
		<Navbar.Collapse id="responsive-navbar-nav">
			<Nav className="mr-auto">
				<Nav.Link as={NavLink} to="/library" onClick={hideNavbar}>Library</Nav.Link>
				<Nav.Link as={NavLink} to="/add" onClick={hideNavbar}>Add</Nav.Link>
				<Nav.Link as={NavLink} to="/about" onClick={hideNavbar}>About</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default MyNavbar;
