import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';

import Navbar from './components/navbar'
import Home from './components/home'
import Library from './components/library'
import Add from './components/add'
import About from './components/about'


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
