import React, { Component } from 'react';

export default class Edit extends Component {
	render() {
		// Props have to be passed differently when using a <Link>
		const { title } = this.props.location.movie

		return <h1>Edit {title}</h1>
	}
}
