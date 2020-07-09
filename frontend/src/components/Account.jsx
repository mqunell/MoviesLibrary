import React, { Component } from 'react'
/* import axios from 'axios' */


export default class Account extends Component {
	state = {
		createTabActive: false
	}

	onSubmitCreate = (e) => {
		// Prevent default HTML form submit event
		e.preventDefault()

		// In-progress - assume account creation worked
		this.props.toggleSignedIn()
	}

	onSubmitSignin = (e) => {
		// Prevent default HTML form submit event
		e.preventDefault()

		// In-progress - assume account signin worked
		this.props.toggleSignedIn()

	}

	render() {
		const { createTabActive } = this.state

		return(<div id="account">
			<div id="create_tab" className={'c-h ' + (createTabActive ? '' : 'inactive_tab')} onClick={() => this.setState({ createTabActive: true })}>
				<p>Create Account</p>
			</div>
			<div id="signin_tab" className={'c-h ' + (createTabActive ? 'inactive_tab' : '')} onClick={() => this.setState({ createTabActive: false })}>
				<p>Sign In</p>
			</div>
			<div id="form_container" className={createTabActive ? '' : 'form_container_rotated'}>
				<div id="create" className="c-h">
					<form onSubmit={this.onSubmitCreate}>
						<input type="email" className="form-control" id="create_email" aria-describedby="emailHelp" placeholder="Email"/>
						<input type="password" className="form-control" id="create_password_1" placeholder="Password"/>
						<input type="password" className="form-control" id="create_password_2" placeholder="Confirm password"/>
						<button type="submit" className="btn btn-primary" id="create_submit">Create Account</button>
					</form>
				</div>
				<div id="signin" className="c-h">
					<form onSubmit={this.onSubmitSignin}>
						<input type="email" className="form-control" id="signin_email" aria-describedby="emailHelp" placeholder="Email"/>
						<input type="password" className="form-control" id="signin_password" placeholder="Password"/>
						<p>Forgot password</p>
						<button type="submit" className="btn btn-primary" id="signin_submit">Sign In</button>
					</form>
				</div>
			</div>
		</div>)
	}
}
