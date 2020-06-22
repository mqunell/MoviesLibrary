import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import Navbar from './components/Navbar'
import Library from './components/Library'
import Add from './components/Add'


function App() {
	return (<Router basename={'/movieslibrary'}>
		<div className="container-fluid">
			<Navbar />

			<Route path="/" exact component={Library} />
			<Route path="/add" component={Add} />
		</div>
	</Router>);
}

export default App;
