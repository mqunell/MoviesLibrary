import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Account from './components/Account';
import Library from './components/Library';
import Add from './components/Add';
import Edit from './components/Edit';
import Alerts from './components/Alerts';

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

	const setUsernameCookie = (username) => {
		cookies.set('username', username, { path: '/' });
		setUsername(username);
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

				<Redirect to="/" />
			</Switch>

			<Alerts />
		</>
	);
}

export default App;
