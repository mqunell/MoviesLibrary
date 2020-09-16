import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"
import MovieInfo from './MovieInfo'
import axios from 'axios'


export default class Library extends Component {
	state = {
		movies: [],
		sortDropdownText: 'Title',
		sortDropdownDisplayed: false,
		selectedMovie: '',
		showModal: false
	}

	componentDidMount() {
		// Get movies from backend, sort by title, and set to this.state
		axios.get(`/api/movies/${this.props.username}`)
			.then(response => {
				this.setState({
					movies: response.data.sort((a, b) => (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0)
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	// Returns an array of <MovieInfo> (and <h1> is sorting by series)
	getMovieCards() {
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
			output.push(
				<div className="movie_card" onClick={() => this.showModal(movie)} key={movie._id}>
					<img className="movie_card_image" src={movie.poster} alt={movie.title + ' poster'}/>
					<MovieInfo movie={movie}/>
				</div>
			)
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
				if (asn !== '' && bsn !== '') {
					if (asn === bsn) return (a.seriesIndex < b.seriesIndex) ? -1 : 1
					else return (asn < bsn) ? -1 : 1
				}
				// Both don't have series; one has series; neither has series
				else {
					if (asn !== '' || bsn !== '') return (asn !== '') ? -1 : 1
					else return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0
				}
			}
			else {  // if (sortBy === 'Runtime')
				const art = parseInt(a.runtime)
				const brt = parseInt(b.runtime)

				return (art < brt) ? -1 : (art > brt) ? 1 : 0
			}
		})

		this.setState({ movies: sortedMovies })
	}

	toggleSortDropdown = () => {
		this.setState({ sortDropdownDisplayed: !this.state.sortDropdownDisplayed })
	}

	showModal = movie => {
		this.setState({ selectedMovie: movie, showModal: true })
	}

	deleteMovie = () => {
		// Remove the movie locally and close the modal
		this.setState({
			movies: this.state.movies.filter(movie => movie._id !== this.state.selectedMovie._id),
			showModal: false
		})

		// Set up DELETE request payload (requires a 'data' key)
		const deleteData = {
			data: { movieMongoId: this.state.selectedMovie._id }
		}

		// Send the DELETE request
		axios.delete('/api/movies', deleteData)
			.then(response => {
				console.log(response)  //todo
			})
			.catch(error => {
				console.log(error)  //todo
			})
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
				{this.getMovieCards()}
			</div>

			<Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Body>
					<div className="modal_top">
						<img src={this.state.selectedMovie.poster} alt={this.state.selectedMovie.title + ' poster'} />
						<div>
							<Link to={{pathname: "/edit", movie: this.state.selectedMovie}} >
								<button type="button" className="btn btn-info">Edit</button>
							</Link>
							<button type="button" className="btn btn-danger" onClick={this.deleteMovie}>Delete</button>
						</div>
					</div>
					<MovieInfo movie={this.state.selectedMovie} />
				</Modal.Body>
			</Modal>
		</>)
	}
}