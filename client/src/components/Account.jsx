import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from '../contexts/AlertContext';

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Account({ setUsername }) {
	const [activeForm, setActiveForm] = useState('login');
	const [animateOut, setAnimateOut] = useState(false);

	const toggleForm = () => {
		setAnimateOut(true);

		setTimeout(() => {
			setAnimateOut(false);
			setActiveForm(activeForm === 'login' ? 'create' : 'login');
		}, 250);
	};

	return (
		<div id="account">
			{activeForm === 'login' ? (
				<LogIn
					animateOut={animateOut}
					toggleForm={toggleForm}
					setUsername={setUsername}
				/>
			) : (
				<CreateAccount
					animateOut={animateOut}
					toggleForm={toggleForm}
					setUsername={setUsername}
				/>
			)}
		</div>
	);
}

function LogIn({ animateOut, toggleForm, setUsername }) {
	const addAlert = useAlert();

	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');

	const onSubmitLogin = (e) => {
		e.preventDefault();

		// Form's "required" properties handle basic validation

		const email = loginEmail;
		const password = loginPassword;

		const loginUser = { email, password };

		axios
			.post('/api/users/login', loginUser)
			.then(() => {
				addAlert({ type: 'success', text: 'Logging in' });
				setUsername(email);
			})
			.catch((error) => addAlert({ type: 'danger', text: error.response.data }));
	};

	return (
		<form className={animateOut && 'animateOut'} onSubmit={onSubmitLogin}>
			<input
				type="email"
				className="form-control"
				id="login_email"
				aria-describedby="emailHelp"
				placeholder="Email"
				required
				onChange={(e) => setLoginEmail(e.target.value)}
			/>
			<input
				type="password"
				className="form-control"
				id="login_password"
				placeholder="Password"
				required
				onChange={(e) => setLoginPassword(e.target.value)}
			/>
			{/* <p>Forgot password</p> */}
			<button type="submit" className="btn btn-primary" id="login_submit">
				Log In
			</button>
			<hr />
			<a href="#" onClick={toggleForm}>
				Create Account
			</a>
		</form>
	);
}

function CreateAccount({ animateOut, toggleForm, setUsername }) {
	const addAlert = useAlert();

	const [createEmail, setCreateEmail] = useState('');
	const [createPasswordOne, setCreatePasswordOne] = useState('');
	const [createPasswordTwo, setCreatePasswordTwo] = useState('');

	const onSubmitCreate = (e) => {
		e.preventDefault();

		// Form's "required" properties handle basic validation

		const email = createEmail;
		const pass1 = createPasswordOne;
		const pass2 = createPasswordTwo;

		// Client-side password verification
		if (pass1 !== pass2) {
			addAlert({ type: 'danger', text: "Passwords don't match" });
			return;
		}

		const newUser = { email, password: pass1 };

		axios
			.post('/api/users/create', newUser)
			.then(() => {
				addAlert({ type: 'success', text: 'Account created' });
				setUsername(email);
			})
			.catch((error) => addAlert({ type: 'danger', text: error.response.data }));
	};

	return (
		<form className={animateOut && 'animateOut'} onSubmit={onSubmitCreate}>
			<input
				type="email"
				className="form-control"
				id="create_email"
				aria-describedby="emailHelp"
				placeholder="Email"
				required
				onChange={(e) => setCreateEmail(e.target.value)}
			/>
			<input
				type="password"
				className="form-control"
				id="create_password_1"
				placeholder="Password"
				required
				onChange={(e) => setCreatePasswordOne(e.target.value)}
			/>
			<input
				type="password"
				className="form-control"
				id="create_password_2"
				placeholder="Confirm password"
				required
				onChange={(e) => setCreatePasswordTwo(e.target.value)}
			/>
			<button type="submit" className="btn btn-primary" id="create_submit">
				Create Account
			</button>
			<hr />
			<a href="#" onClick={toggleForm}>
				Log In
			</a>
		</form>
	);
}
