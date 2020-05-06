import React, { Component } from 'react'
import axios from 'axios'


// Functional React component (no state or lifecycle methods)
// Good for accepting props and returning JSX
const MovieDetails = props => (
	<div className="movie_card">
		<img className="movie_card_image" src={props.movie.poster} alt="Cover art"/>
		<div className="movie_card_details">
			<div className="movie_card_details_line">
				<p>{props.movie.title.length > 40 ? props.movie.title.slice(0, 40) + '...' : props.movie.title}</p>
				<p>{props.movie.year}</p>
			</div>

			<div className="movie_card_details_line">
				<p>{props.movie.rating}</p>
				<p>{props.movie.runtime}</p>
				<p>{props.movie.metacritic}/100</p>
			</div>

			<p>{props.movie.plot}</p>

			<div className="formats_container">
				<div className={'format_item format_dvd' + (props.movie.formats.includes('1') ? ' has_format' : '')}>
					<i class="fas fa-compact-disc"></i>
					<p>DVD</p>
				</div>
				<div className={'format_item format_bluray' + (props.movie.formats.includes('2') ? ' has_format' : '')}>
					<i class="fas fa-compact-disc"></i>
					<p>Bluray</p>
				</div>
				<div className={'format_item format_4k' + (props.movie.formats.includes('3') ? ' has_format' : '')}>
					<i class="fas fa-compact-disc"></i>
					<p>4K</p>
				</div>
				<div className={'format_item format_digital' + (props.movie.formats.includes('4') ? ' has_format' : '')}>
					<i class="fas fa-hdd"></i>
					<p>Digital</p>
				</div>
				<div className={'format_item format_streaming' + (props.movie.formats.includes('5') ? ' has_format' : '')}>
					<i class="fas fa-cloud"></i>
					<p>Stream</p>
				</div>
			</div>
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
		// Use MongoDB ID for React key
		return this.state.movies.map(currentMovie => {
			return <MovieDetails movie={currentMovie} key={currentMovie._id}/>
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
