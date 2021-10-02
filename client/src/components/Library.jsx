import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieInfo from './MovieInfo';

export default function Library({ username }) {
	const [movies, setMovies] = useState([]);
	const [sortDropdownText, setSortDropdownText] = useState('Title');
	const [sortDropdownDisplayed, setSortDropdownDisplayed] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState('');
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		// Get movies from backend, sort by title, and set to state
		axios
			.get(`/api/movies/${username}`)
			.then((response) => {
				const sortedMovies = response.data.sort((a, b) =>
					a.title < b.title ? -1 : a.title > b.title ? 1 : 0
				);
				setMovies(sortedMovies);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [username]);

	// Returns an array of <MovieInfo> (and <h1> is sorting by series)
	const getMovieCards = () => {
		const output = [];
		let currentSeries = '';

		movies.forEach((movie) => {
			// Append series names if sorted by series
			if (sortDropdownText === 'Series') {
				const seriesName = movie.seriesName || 'Standalone';

				if (seriesName !== currentSeries) {
					output.push(
						<h1 className="series_name" key={seriesName + 'heading'}>
							{seriesName}
						</h1>
					);
					currentSeries = seriesName;
				}
			}

			// Use MongoDB ID for React key
			output.push(
				<div className="movie_card" onClick={() => setModalMovie(movie)} key={movie._id}>
					<img
						className="movie_card_image"
						src={movie.poster}
						alt={movie.title + ' poster'}
					/>
					<MovieInfo movie={movie} />
				</div>
			);
		});

		return output;
	};

	const sortMovies = (sortBy) => {
		toggleSortDropdown();
		setSortDropdownText(sortBy);

		const sortedMovies = this.state.movies.sort((a, b) => {
			if (sortBy === 'Title') {
				return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
			} else if (sortBy === 'Series') {
				const asn = a.seriesName;
				const bsn = b.seriesName;

				// Both have series; same series; different series
				if (asn !== '' && bsn !== '') {
					if (asn === bsn) return a.seriesIndex < b.seriesIndex ? -1 : 1;
					else return asn < bsn ? -1 : 1;
				}
				// Both don't have series; one has series; neither has series
				else {
					if (asn !== '' || bsn !== '') return asn !== '' ? -1 : 1;
					else return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
				}
			} else {
				// if (sortBy === 'Runtime')
				const art = parseInt(a.runtime);
				const brt = parseInt(b.runtime);

				return art < brt ? -1 : art > brt ? 1 : 0;
			}
		});

		setMovies(sortedMovies);
	};

	const toggleSortDropdown = () => {
		setSortDropdownDisplayed(sortDropdownDisplayed);
	};

	const setModalMovie = (movie) => {
		setSelectedMovie(movie);
		setShowModal(true);
	};

	const deleteMovie = () => {
		// Remove the movie locally and close the modal
		setMovies(movies.filter((movie) => movie._id !== selectedMovie._id));
		setShowModal(false);

		// Set up DELETE request payload (requires a 'data' key)
		const deleteData = {
			data: { movieMongoId: selectedMovie._id },
		};

		// Send the DELETE request
		axios
			.delete('/api/movies', deleteData)
			.then((response) => {
				console.log(response); //todo
			})
			.catch((error) => {
				console.log(error); //todo
			});
	};

	return (
		<>
			<div className="sort_container" role="group">
				<p>Sort by:</p>
				<div className="dropdown">
					<button
						id="sort_button"
						className="btn btn-primary dropdown-toggle"
						type="button"
						onClick={toggleSortDropdown}
					>
						{sortDropdownText}
					</button>
					<div
						id="sort_dropdown"
						className={'dropdown-menu' + (sortDropdownDisplayed ? ' show' : '')}
					>
						<span className="dropdown-item" onClick={() => sortMovies('Title')}>
							Title
						</span>
						<span className="dropdown-item" onClick={() => sortMovies('Series')}>
							Series
						</span>
						<span className="dropdown-item" onClick={() => sortMovies('Runtime')}>
							Runtime
						</span>
					</div>
				</div>
			</div>

			<div className="movie_card_container">{getMovieCards()}</div>

			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body>
					<div className="modal_top">
						<img src={selectedMovie.poster} alt={selectedMovie.title + ' poster'} />
						<div>
							<Link to={{ pathname: '/edit', movie: selectedMovie }}>
								<button type="button" className="btn btn-info">
									Edit
								</button>
							</Link>
							<button type="button" className="btn btn-danger" onClick={deleteMovie}>
								Delete
							</button>
						</div>
					</div>
					<MovieInfo movie={selectedMovie} />
				</Modal.Body>
			</Modal>
		</>
	);
}
