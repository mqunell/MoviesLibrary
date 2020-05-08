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
		// Get movies from backend, sort by title, and set to this.state
		axios.get('http://localhost:5050/api/movies')
			.then(response => {
				this.setState({
					movies: response.data.sort((a, b) => (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0)
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

	sortMovies = (sortBy) => {
		this.toggleDropdown()
		document.getElementById('sort_button').innerHTML = sortBy

		const sortedMovies = this.state.movies.sort((a, b) => {
			if (sortBy === 'Title') {
				return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0
			}
			else if (sortBy === 'Series') {
				const asn = a.seriesName
				const bsn = b.seriesName

				// Both have series; same series; different series
				if (asn !== null && bsn !== null) {
					if (asn === bsn) return (a.seriesIndex < b.seriesIndex) ? -1 : 1
					else return (asn < bsn) ? -1 : 1
				}
				// Both don't have series; one has series; neither has series
				else {
					if (asn !== null || bsn !== null) return (asn !== null) ? -1 : 1
					else return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0
				}
			}
			else if (sortBy === 'Runtime') {
				const art = parseInt(a.runtime)
				const brt = parseInt(b.runtime)

				return (art < brt) ? -1 : (art > brt) ? 1 : 0
			}
		})

		this.setState(sortedMovies)
	}

	toggleDropdown() {
		document.getElementById('sort_dropdown').classList.toggle('show')
	}

	render() {
		return (<>
			<div className="sort_container" role="group">
				<p>Sort by:</p>
				<div className="dropdown">
					<button id="sort_button" className="btn btn-primary dropdown-toggle" type="button" onClick={this.classList.toggle('show')}>
						Title
					</button>
					<div id="sort_dropdown" className="dropdown-menu">
						<span className="dropdown-item" onClick={() => this.sortMovies('Title')}>Title</span>
						<span className="dropdown-item" onClick={() => this.sortMovies('Series')}>Series</span>
						<span className="dropdown-item" onClick={() => this.sortMovies('Runtime')}>Duration</span>
					</div>
				</div>
			</div>

			<div className="movie_card_container">
				{ this.getAllMovies() }
			</div>
		</>)
	}
}
