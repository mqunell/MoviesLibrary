import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import MovieCard from './MovieCard'
import axios from 'axios'


export default class Library extends Component {
	state = {
		movies: [],
		sortDropdownText: 'Title',
		sortDropdownDisplayed: false,
		modalMovie: '',
		showModal: false
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
			output.push(<MovieCard movie={movie} showModal={this.showModal} key={movie._id} />)
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

	showModal = movie => {
		this.setState({ modalMovie: movie, showModal: true })
	}

	getModalBody() {
		const { title, year, rating, runtime, genre, director, actors, plot, poster, metacritic, seriesName, seriesIndex, formats } = this.state.modalMovie

		return (
			<Modal.Body>
				<img src={poster} alt={title + ' poster'} />
				<div className="modal_text">
					<p className="modal_title">{title}</p>
					<p className="modal_series">{(seriesName !== null ? seriesName + ' #' + seriesIndex : '')}</p>
					<div className="modal_text_row">
						<div><i className="far fa-calendar-alt"></i><p>{year}</p></div>
						<div><i className="fas fa-users"></i><p>{rating}</p></div>
						<div><i className="far fa-clock"></i><p>{runtime}</p></div>
						<div><i className="far fa-star"></i><p>{metacritic}/100</p></div>
					</div>
					<div className="modal_text_col">
						<p>Genre</p>
						<p>{genre}</p>
					</div>
					<div className="modal_text_col">
						<p>Plot</p>
						<p>{plot}</p>
					</div>
					<div className="modal_text_col">
						<p>Director</p>
						<p>{director}</p>
					</div>
					<div className="modal_text_col">
						<p>Cast</p>
						<p>{actors}</p>
					</div>
				</div>
			</Modal.Body>
		)
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
				{this.getAllMovies()}
			</div>

			<Modal show={this.state.showModal} onHide={() => {this.setState({ showModal: false })}} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				{this.getModalBody()}
			</Modal>
		</>)
	}
}
