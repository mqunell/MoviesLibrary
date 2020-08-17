import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

function hideNavbar() {
	if (window.innerWidth <= 575) {
		document.getElementsByClassName('navbar-toggler')[0].click()
	}
}

const MyNavbar = ({ signedIn, setUsername }) => (
	<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className={signedIn.toString()}>
		<Navbar.Brand as={NavLink} to="/">Movies Library</Navbar.Brand>

		<Navbar.Toggle aria-controls="responsive-navbar-nav" />

		<Navbar.Collapse id="responsive-navbar-nav">
			<Nav>
				<Nav.Link as={NavLink} to="/add"onClick={hideNavbar}>Add</Nav.Link>

				<Nav.Link as={NavLink} to="/"onClick={() => {
					hideNavbar()
					setUsername('')
				}}>Log Out</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default MyNavbar
