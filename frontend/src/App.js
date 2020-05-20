import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import Navbar from './components/Navbar'
import Home from './components/Home'
import Library from './components/Library'
import Add from './components/Add'
import About from './components/About'


function App() {
	return (<Router>
		<div className="container-fluid">
			<Navbar />

			<Route path="/" exact component={Home} />
			<Route path="/library" component={Library} />
			<Route path="/add" component={Add} />
			<Route path="/about" component={About} />
		</div>
	</Router>);
}

export default App;
