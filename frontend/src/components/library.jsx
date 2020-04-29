import React, { Component } from 'react'
import axios from 'axios'

// Functional React component (no state or lifecycle methods)
// Good for accepting props and returning JSX
const MovieDetails = props => (
	<tr>
		<td>{props.movie.title}</td>
		<td>{props.movie.year}</td>
		<td>{props.movie.rating}</td>
		<td>{props.movie.runtime}</td>
		<td>{props.movie.genre}</td>
		<td>{props.movie.director}</td>
		<td>{props.movie.actors}</td>
		<td>{props.movie.plot}</td>
		<td>{props.movie.poster}</td>
		<td>{props.movie.metacritic}</td>
	</tr>
)


export default class Library extends Component {
	state = {
		movies: []
	}

	componentDidMount() {
		axios.get('http://localhost:5050/api/movies')
			.then(response => {
				this.setState({
					movies: response.data
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	getAllMovies() {
		console.log('here')
		return this.state.movies.map(currentMovie => {
			return <MovieDetails movie={currentMovie}/>
		})
	}

	render() {
		return (
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th>Title</th>
						<th>Year</th>
						<th>Rating</th>
						<th>Runtime</th>
						<th>Genre</th>
						<th>Director</th>
						<th>Actors</th>
						<th>Plot</th>
						<th>Poster</th>
						<th>Metacritic</th>
					</tr>
				</thead>
				<tbody>
					{ this.getAllMovies() }
				</tbody>
			</table>
		);
	}
}
