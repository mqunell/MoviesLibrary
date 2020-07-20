import React, { Component } from 'react'
import axios from 'axios'
import Alert from './Alert.js'


export default class Account extends Component {
	state = {
		createTabActive: false,
		create_email: '',
		create_password_1: '',
		create_password_2: '',
		login_email: '',
		login_password: ''
	}

	onChangeGeneric = (e) => {
		const key = e.target.id
		const val = e.target.value

		this.setState({ [key]: val })
	}

	onSubmitCreate = (e) => {
		// Prevent default HTML form submit event
		e.preventDefault()

		// Form's "required" properties handle basic validation

		const email = this.state.create_email
		const pass1 = this.state.create_password_1
		const pass2 = this.state.create_password_2

		// Client-side password verification
		if (pass1 === pass2) {
			const newUser = { 'email': email, 'password': pass1}

			axios.post('http://localhost:5050/api/users', newUser)
				.then(response => {
					Alert.get().show('Account created', 'success', true)
					this.props.setSignedIn(true)
				})
				.catch(error => Alert.get().show(error.response.data, 'danger', true))
		}
		else {
			Alert.get().show('Passwords don\'t match', 'danger', true)
		}
	}

	onSubmitLogin = (e) => {
		// Prevent default HTML form submit event
		e.preventDefault()

		// Form's "required" properties handle basic validation

		const email = this.state.login_email
		const password = this.state.login_password

		const loginUser = { email, password }

		axios.get('http://localhost:5050/api/users', { params: loginUser })
			.then(response => {
				Alert.get().show('Logging in', 'success', true)
				this.props.setSignedIn(true)
			})
			.catch(error => Alert.get().show(error.response.data, 'danger', true))
	}

	render() {
		const { createTabActive } = this.state

		return(<>
			<div id="account">
				<div id="create_tab" className={'c-h ' + (createTabActive ? '' : 'inactive_tab')} onClick={() => this.setState({ createTabActive: true })}>
					<p>Create Account</p>
				</div>
				<div id="login_tab" className={'c-h ' + (createTabActive ? 'inactive_tab' : '')} onClick={() => this.setState({ createTabActive: false })}>
					<p>Log In</p>
				</div>
				<div id="form_container" className={createTabActive ? '' : 'form_container_rotated'}>
					<div id="create" className="c-h">
						<form onSubmit={this.onSubmitCreate}>
							<input type="email" className="form-control" id="create_email" aria-describedby="emailHelp" placeholder="Email" required onChange={this.onChangeGeneric} />
							<input type="password" className="form-control" id="create_password_1" placeholder="Password" required onChange={this.onChangeGeneric} />
							<input type="password" className="form-control" id="create_password_2" placeholder="Confirm password" required onChange={this.onChangeGeneric} />
							<button type="submit" className="btn btn-primary" id="create_submit">Create Account</button>
						</form>
					</div>
					<div id="login" className="c-h">
						<form onSubmit={this.onSubmitLogin}>
							<input type="email" className="form-control" id="login_email" aria-describedby="emailHelp" placeholder="Email" required onChange={this.onChangeGeneric} />
							<input type="password" className="form-control" id="login_password" placeholder="Password" required onChange={this.onChangeGeneric} />
							<p>Forgot password</p>
							<button type="submit" className="btn btn-primary" id="login_submit">Log In</button>
						</form>
					</div>
				</div>
			</div>

			<p style={{ textAlign: 'center', color: 'red' }}>Note: Passwords are *not* stored securely yet!</p>
		</>)
	}
}
