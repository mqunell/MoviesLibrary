import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<Link to="/" className="navbar-brand">Movies Library</Link>

			<ul className="navbar-nav">
				<li className="navbar-item">
					<Link to="/library" className="nav-link">Library</Link>
				</li>
				<li className="navbar-item">
					<Link to="/add" className="nav-link">Add</Link>
				</li>
				<li className="navbar-item">
					<Link to="/about" className="nav-link">About</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar;
