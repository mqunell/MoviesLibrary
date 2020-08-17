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
		username: ''
	}

	componentDidMount() {
		this.cookies = new Cookies()
		const c = this.cookies.get('username')
		this.setUsername((c === undefined) ? '' : c)
	}

	setUsername = (username) => {
		this.cookies.set('username', username, { path: '/' })
		this.setState({ username })
	}

	render() {
		const signedIn = this.state.username.length > 0

		return (<>
			<Navbar signedIn={signedIn} setUsername={this.setUsername} />

			<Switch>
				<Route exact path="/" render={() => (
					(signedIn) ? <Library username={this.state.username} /> : <Account setUsername={this.setUsername} />
				)} />
				<Route path="/account" render={() => <Account setUsername={this.setUsername} />} />
				<Route path="/add" render={() => <Add username={this.state.username} />} />
				<Route path="/edit" component={Edit} />
				{/* <Route path="/add" component={Add} /> */}

				<Redirect to="/" />
			</Switch>

			<div id="alert" className={this.state.alertClasses} role="alert">
				{this.state.alertText}
			</div>
		</>)
	}
}

export default App
