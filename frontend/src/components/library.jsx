import React, { Component } from 'react'
import axios from 'axios'


// Functional React component (no state or lifecycle methods)
// Good for accepting props and returning JSX
const MovieDetails = props => (
	<div className="movie_card">
		<img className="movie_card_image" src={props.movie.poster} alt="Cover art"/>
		<div className="movie_card_details">
			<p>{props.movie.title} ({props.movie.year})</p>
			<div className="movie_card_details_line">
				<p>{props.movie.runtime}</p>
				<p>{props.movie.rating}</p>
				<p>{props.movie.metacritic}/100</p>
			</div>
			<p>{props.movie.plot}</p>
		</div>
	</div>
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
		return this.state.movies.map(currentMovie => {
			return <MovieDetails movie={currentMovie}/>
		})
	}

	render() {
		return (
			<div className="movie_card_container">
				{ this.getAllMovies() }
			</div>
		)
	}
}
