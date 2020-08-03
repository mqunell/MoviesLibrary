import React, { Component } from 'react'
import { Route, Switch, Redirect } from "react-router-dom"
import Cookies from 'universal-cookie'

// CSS
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

// Components
import Navbar from './components/Navbar'
import Account from './components/Account'
import Library from './components/Library'
import Add from './components/Add'
import Edit from './components/Edit'


/**
 * Displays the Navbar and Account
 * <Route>s must be added here for <Link>s throughout the project
 */
class App extends Component {
	state = {
		signedIn: false
	}

	componentDidMount() {
		this.cookies = new Cookies()
		this.setSignedIn(this.cookies.get('signedIn') === 'true')
	}

	setSignedIn = (signedIn) => {
		this.cookies.set('signedIn', signedIn.toString(), { path: '/' })
		this.setState({ signedIn })
	}

	render() {
		return (<>
			<Navbar signedIn={this.state.signedIn} setSignedIn={this.setSignedIn} />

			<Switch>
				<Route exact path="/" render={() => (
					(this.state.signedIn) ? <Library /> : <Account setSignedIn={this.setSignedIn} />
				)} />
				<Route path="/account" render={() => <Account setSignedIn={this.setSignedIn} />} />
				<Route path="/library" component={Library} />
				<Route path="/add" component={Add} />
				<Route path="/edit" component={Edit} />
				<Redirect to="/" />
			</Switch>

			<div id="alert" className={this.state.alertClasses} role="alert">
				{this.state.alertText}
			</div>
		</>)
	}
}

export default App
