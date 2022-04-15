import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Navbar from './components/Navbar';
import Account from './components/Account';
import Library from './components/Library';
import Add from './components/Add';
import Edit from './components/Edit';
import Alerts from './contexts/Alerts';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

/**
 * Displays the Navbar and Account
 * <Route>s must be added here for <Link>s throughout the project
 */
function App() {
	const [username, setUsername] = useState('');

	const cookies = new Cookies();

	useEffect(() => {
		const cookieUsername = cookies.get('username');
		setUsername(cookieUsername === undefined ? '' : cookieUsername);
	}, [cookies]);

	const setUsernameCookie = (newUsername) => {
		cookies.set('username', newUsername, { path: '/' });
		setUsername(newUsername);
	};

	const signedIn = username.length > 0;

	return (
		<>
			<Navbar signedIn={signedIn} setUsername={setUsernameCookie} />

			<Switch>
				<Route
					exact
					path="/"
					render={() =>
						signedIn ? (
							<Library username={username} />
						) : (
							<Account setUsername={setUsernameCookie} />
						)
					}
				/>
				<Route
					path="/account"
					render={() => <Account setUsername={setUsernameCookie} />}
				/>
				<Route path="/add" render={() => <Add username={username} />} />
				<Route path="/edit" component={Edit} />
				<Route path="/about" component={About} />

				<Redirect to="/" />
			</Switch>

			<Alerts />
		</>
	);
}

export default App;
