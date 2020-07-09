import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import Navbar from './components/Navbar'
import Library from './components/Library'
import Add from './components/Add'
import Edit from './components/Edit'


/**
 * Displays the Navbar and Library (default)
 * <Route>s must be added here for <Link>s throughout the project
 */
function App() {
	return (<>
		<Navbar />

		<Switch>
			<Route exact path="/" component={Library} />
			<Route path="/add" component={Add} />
			<Route path="/edit" component={Edit} />
			<Redirect to="/" />
		</Switch>
	</>);
}


export default App;
