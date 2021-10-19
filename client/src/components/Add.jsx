import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AlertContext } from '../contexts/AlertContext';

const AddMovieCard = ({ imdbId, title, year, poster, onClick }) => (
	<div className="add_movie_card" onClick={() => onClick(imdbId, title)}>
		<div className="c-h">
			<img src={poster} alt={title + ' poster'} />
		</div>
		<p>
			{title} <span>({year})</span>
		</p>
	</div>
);

function Add({ username }) {
	const { addAlert } = useContext(AlertContext);

	const [title, setTitle] = useState('');
	const [movies, setMovies] = useState([]);

	const onSubmit = (e) => {
		// Prevent default HTML form submit event
		e.preventDefault();

		addAlert('Searching movies...', 'info');

		// Send the search term to backend
		axios
			.get(`/api/omdb/${title}`)
			.then((response) => {
				setMovies(response.data);
				addAlert(`Showing results for "${title}"`, 'success');
			})
			.catch((error) => {
				const errorMessage = error.response
					? error.response.data
					: 'Could not connect to server';

				addAlert(`Error: ${errorMessage}`, 'danger');
			});
	};

	const onClickMovie = (imdbId, movieTitle) => {
		addAlert(`Adding "${movieTitle}"`, 'info');

		// Send the ID to backend
		axios
			.post(`/api/movies`, { username, imdbId })
			.then((response) => {
				addAlert(`${response.data.title} added`, 'success');
			})
			.catch((error) => {
				const errorMessage = error.response
					? error.response.data
					: 'Could not connect to server';

				addAlert(`Error: ${errorMessage}`, 'danger');
			});
	};

	return (
		<div className="container-xl">
			<form onSubmit={onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-12">
						<label htmlFor="inputTitle">Title</label>
						<input
							type="text"
							className="form-control"
							id="inputTitle"
							placeholder="Avengers: Infinity War"
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-12">
						<input type="submit" className="btn btn-primary" value="Search Movies" />
					</div>
				</div>
			</form>

			<div id="add_movie_card_container">
				{movies.map((movie) => (
					<AddMovieCard
						key={movie.imdbID}
						imdbId={movie.imdbID}
						poster={movie.Poster}
						title={movie.Title}
						year={movie.Year}
						onClick={() => onClickMovie(movie.imdbID, movie.Title)}
					/>
				))}
			</div>
		</div>
	);
}

export default Add;
