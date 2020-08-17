import React, { Component } from 'react'
import axios from 'axios'  // Promise-based HTTP client
import Alert from './Alert.js'


const AddMovieCard = props => (
	<div className="add_movie_card" onClick={() => props.onClick(props.imdbId, props.title)}>
		<div className="c-h">
			<img src={props.poster} alt={props.title + ' poster'}/>
		</div>
		<p>{props.title} <span>({props.year})</span></p>
	</div>
)


export default class Add extends Component {
	state = {
		title: '',
		movies: []
	}

	onChangeTitle = (e) => this.setState({ title: e.target.value})

	onSubmit = (e) => {
		// Prevent default HTML form submit event
		e.preventDefault()

		const searchTerm = this.state.title

		Alert.get().show('Searching movies...', 'info', false)

		// Send the search term to backend
		axios.get(`/api/movies/${searchTerm}`)
			.then(response => {
				this.setState({ movies: response.data })
				Alert.get().show(`Showing results for "${searchTerm}"`, 'success', true)
			})
			.catch(error => {
				Alert.get().show(`Error: ${error.response ? error.response.data : 'Could not connect to server'}`, 'danger', true)
			})
	}

	onClickMovie = (imdbId, title) => {
		Alert.get().show(`Adding "${title}"`, 'info', false)

		// Send the ID to backend
		axios.post(`/api/movies`, { username: this.props.username, imdbId })
			.then(response => {
				Alert.get().show(`${response.data.title} added`, 'success', true)
			})
			.catch(error => {
				Alert.get().show(`Error: ${error.response ? error.response.data : 'Could not connect to server'}`, 'danger', true)
			})
	}

	render() {
		return (<div className="container-xl">
			<form onSubmit={this.onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-12">
						<label htmlFor="inputTitle">Title</label>
						<input type="text" className="form-control" id="inputTitle" placeholder="Avengers: Infinity War" onChange={this.onChangeTitle}/>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-12">
						<input type="submit" className="btn btn-primary" value="Search Movies"/>
					</div>
				</div>
			</form>

			<div id="add_movie_card_container">
				{this.state.movies.map(movie =>
					<AddMovieCard key={movie.imdbID} imdbId={movie.imdbID} poster={movie.Poster} title={movie.Title} year={movie.Year} onClick={this.onClickMovie}/>
				)}
			</div>
		</div>)
	}
}
