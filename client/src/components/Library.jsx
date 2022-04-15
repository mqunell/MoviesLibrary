import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieInfo from './MovieInfo';
import { useAlert } from '../contexts/AlertContext';

export default function Library({ username }) {
	const [movies, setMovies] = useState([]);
	const [sortDropdownText, setSortDropdownText] = useState('Title');
	const [sortDropdownDisplayed, setSortDropdownDisplayed] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState('');
	const [showModal, setShowModal] = useState(false);

	const addAlert = useAlert();

	useEffect(() => {
		// Get movies from backend, sort by title, and set to state
		axios
			.get(`/api/movies/${username}`)
			.then((response) => {
				const sortedMovies = response.data.sort((a, b) => (a.title <= b.title ? -1 : 1));
				setMovies(sortedMovies);
			})
			.catch((error) => console.log(error));
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
				<div
					key={movie._id}
					className="movie_card"
					role="button"
					tabIndex="-1"
					onClick={() => setModalMovie(movie)}
					onKeyPress={() => setModalMovie(movie)}
				>
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

		const sortedMovies = movies.sort((a, b) => {
			if (sortBy === 'Title') {
				return a.title <= b.title ? -1 : 1;
			}

			if (sortBy === 'Series') {
				const asn = a.seriesName;
				const bsn = b.seriesName;

				// Both have series -> same series, different series
				if (asn !== '' && bsn !== '') {
					if (asn === bsn) {
						return a.seriesIndex < b.seriesIndex ? -1 : 1;
					}
					return asn < bsn ? -1 : 1;
				}

				// Both don't have series -> one has series, neither has series
				if (asn !== '' || bsn !== '') {
					return asn !== '' ? -1 : 1;
				}

				return a.title <= b.title ? -1 : 1;
			}

			// if (sortBy === 'Runtime')
			const art = parseInt(a.runtime);
			const brt = parseInt(b.runtime);

			return art <= brt ? -1 : 1;
		});

		setMovies(sortedMovies);
	};

	const toggleSortDropdown = () => setSortDropdownDisplayed(!sortDropdownDisplayed);

	const setModalMovie = (movie) => {
		setSelectedMovie(movie);
		setShowModal(true);
	};

	const deleteSelectedMovie = () => {
		const { _id, title } = selectedMovie;

		addAlert({ type: 'info', text: `Deleting ${title}...` });

		// Set up DELETE request payload (requires a 'data' key)
		const deleteData = {
			data: { movieMongoId: _id },
		};

		// Send the DELETE request
		axios
			.delete('/api/movies', deleteData)
			.then(() => {
				// Remove the movie locally, close the modal, and add an alert
				setMovies(movies.filter((movie) => movie._id !== _id));
				setShowModal(false);
				addAlert({ type: 'success', text: `${title} deleted` });
			})
			.catch((error) => {
				const errorMessage = error.response
					? error.response.data
					: 'Could not connect to server';

				addAlert({ type: 'danger', text: `Error: ${errorMessage}` });
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
						{['Title', 'Series', 'Runtime'].map((item) => (
							<span
								key={`dropdown-${item}`}
								className="dropdown-item"
								role="button"
								tabIndex="-1"
								onClick={() => sortMovies('Title')}
								onKeyPress={() => sortMovies('Title')}
							>
								Title
							</span>
						))}
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
							<button
								type="button"
								className="btn btn-danger"
								onClick={deleteSelectedMovie}
							>
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
