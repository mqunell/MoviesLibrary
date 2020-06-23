import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import Navbar from './components/Navbar'
import Library from './components/Library'
import Add from './components/Add'
import Edit from './components/Edit'

/**
 * Displays the Navbar and Library automatically
 * Routes must be added here for <Link>s throughout the project
 */
function App() {
	return (
		<Router basename={'/movieslibrary'}>
			<Navbar />

			<Route path="/" exact component={Library} />
			<Route path="/add" component={Add} />
			<Route path="/edit" component={Edit} />
		</Router>
	);
}

export default App;
