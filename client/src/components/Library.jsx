import React, { useEffect, useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieInfo from './MovieInfo';

export default function Library({ username }) {
	const [movies, setMovies] = useState([]);
	const [sortDropdownText, setSortDropdownText] = useState('Title');
	const [selectedMovie, setSelectedMovie] = useState('');
	const [showModal, setShowModal] = useState(false);

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

	const sortMovies = (sortBy) => {
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

	const setModalMovie = (movie) => {
		setSelectedMovie(movie);
		setShowModal(true);
	};

	// Returns a sorted array of MovieInfo (and <h1> if sorting by series)
	const getMovieCards = () => {
		const output = [];
		let currentSeries = '';

		movies.forEach((movie, index) => {
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
					onClick={() => setModalMovie(movie)}
					onKeyPress={() => setModalMovie(movie)}
					tabIndex={index + 1}
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
				console.log(response); // todo
			})
			.catch((error) => {
				console.log(error); // todo
			});
	};

	return (
		<>
			<div className="sort_container">
				<p>Sort by:</p>
				<Dropdown>
					<Dropdown.Toggle variant="primary">{sortDropdownText}</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item href="#" onClick={() => sortMovies('Title')}>
							Title
						</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => sortMovies('Series')}>
							Series
						</Dropdown.Item>
						<Dropdown.Item href="#" onClick={() => sortMovies('Runtime')}>
							Runtime
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
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
