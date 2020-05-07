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
				<MovieFormatItem data={{
					formatString: 'DVD',
					hasFormat: props.movie.formats.includes('1'),
					formatIcon: 'compact-disc'
				}}/>

				<MovieFormatItem data={{
					formatString: 'Bluray',
					hasFormat: props.movie.formats.includes('2'),
					formatIcon: 'compact-disc'
				}}/>

				<MovieFormatItem data={{
					formatString: '4K',
					hasFormat: props.movie.formats.includes('3'),
					formatIcon: 'compact-disc'
				}}/>

				<MovieFormatItem data={{
					formatString: 'Digital',
					hasFormat: props.movie.formats.includes('4'),
					formatIcon: 'hdd'
				}}/>

				<MovieFormatItem data={{
					formatString: 'Stream',
					hasFormat: props.movie.formats.includes('5'),
					formatIcon: 'cloud'
				}}/>
			</div>
		</div>
	</div>
)

const MovieFormatItem = props => (
	<div className={'format_item format_' + props.data.formatString.toLowerCase() + (props.data.hasFormat ? ' has_format' : '')}>
		<i className={'fas fa-' + props.data.formatIcon}></i>
		<p>{props.data.formatString}</p>
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
