import React, { Component } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'


export default class Library extends Component {
	state = {
		movies: [],
		sortDropdownText: 'Title',
		sortDropdownDisplayed: false
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

	// Returns an array of <MovieCard> (and <h1> is sorting by series)
	getAllMovies() {
		let output = []
		let currentSeries = ''

		this.state.movies.forEach(movie => {
			// Append series names if sorted by series
			if (this.state.sortDropdownText === 'Series') {
				const seriesName = movie.seriesName || 'Standalone'
	
				if (seriesName !== currentSeries) {
					output.push(<h1 className="series_name" key={seriesName + 'heading'}>{seriesName}</h1>)
					currentSeries = seriesName
				}
			}

			// Use MongoDB ID for React key
			output.push(<MovieCard movie={movie} key={movie._id} />)
		})

		return output
	}

	sortMovies = (sortBy) => {
		this.toggleSortDropdown()
		this.setState({ sortDropdownText: sortBy })

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

		this.setState({ movies: sortedMovies })
	}

	toggleSortDropdown = () => {
		this.setState( { sortDropdownDisplayed: !this.state.sortDropdownDisplayed })
	}

	render() {
		return (<>
			<div className="sort_container" role="group">
				<p>Sort by:</p>
				<div className="dropdown">
					<button id="sort_button" className="btn btn-primary dropdown-toggle" type="button" onClick={this.toggleSortDropdown}>
						{this.state.sortDropdownText}
					</button>
					<div id="sort_dropdown" className={'dropdown-menu' + (this.state.sortDropdownDisplayed ? ' show' : '')}>
						<span className="dropdown-item" onClick={() => this.sortMovies('Title')}>Title</span>
						<span className="dropdown-item" onClick={() => this.sortMovies('Series')}>Series</span>
						<span className="dropdown-item" onClick={() => this.sortMovies('Runtime')}>Runtime</span>
					</div>
				</div>
			</div>

			<div className="movie_card_container">
				{ this.getAllMovies() }
			</div>
		</>)
	}
}
