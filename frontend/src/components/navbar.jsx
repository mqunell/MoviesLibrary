import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Link to="/" className="navbar-brand">Movies Library</Link>

			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
			</div>
		</nav>
	)
}

export default Navbar;
