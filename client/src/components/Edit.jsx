import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from '../contexts/AlertContext';

export default function Edit({ location }) {
	const { addAlert } = useAlert();

	// Props are passed differently when using a <Link>
	const [movie, setMovie] = useState(location.movie);

	if (!location.movie) return <></>;

	const onChangeGeneric = (e) => {
		const element = e.target;

		const key = element.id.substr(element.id.indexOf('_') + 1);
		const val = element.value;

		setMovie({ ...movie, [key]: val });
	};

	const onChangeFormats = (e) => {
		const formatNum = e.target.value;
		const currentFormats = movie.formats;

		const newFormats = currentFormats.includes(formatNum)
			? currentFormats.replace(formatNum, '')
			: currentFormats + formatNum;

		setMovie({ ...movie, formats: newFormats });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const { _id, ...movieObject } = movie;

		axios
			.put('/api/movies', { movieMongoId: _id, movie: movieObject })
			.then((response) =>
				addAlert({ type: 'success', text: `${response.data.title} updated` })
			)
			.catch((error) => {
				const errorMessage = error.reponse ? error.response.data : 'Unknown error';
				addAlert({ type: 'danger', text: `Error: ${errorMessage}` });
			});
	};

	const {
		title,
		seriesName,
		seriesIndex,
		year,
		rating,
		runtime,
		genre,
		director,
		actors,
		plot,
		metacritic,
		formats,
	} = movie;

	return (
		<div className="container-xl">
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="input_title">Title</label>
					<input
						type="text"
						className="form-control"
						id="input_title"
						defaultValue={title}
						onChange={onChangeGeneric}
					/>
				</div>

				<div className="form-row">
					<div className="form-group col-md-8">
						<label htmlFor="input_seriesName">Series Name</label>
						<input
							type="text"
							className="form-control"
							id="input_seriesName"
							defaultValue={seriesName}
							onChange={onChangeGeneric}
						/>
					</div>

					<div className="form-group col-md-4">
						<label htmlFor="input_seriesIndex">Series Index</label>
						<input
							type="text"
							className="form-control"
							id="input_seriesIndex"
							defaultValue={seriesIndex}
							onChange={onChangeGeneric}
						/>
					</div>
				</div>

				<div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label htmlFor="input_year">Release Year</label>
							<input
								type="text"
								className="form-control"
								id="input_year"
								defaultValue={year}
								onChange={onChangeGeneric}
							/>
						</div>

						<div className="form-group col-md-4">
							<label htmlFor="select_rating">Rating</label>
							<select
								className="custom-select"
								id="select_rating"
								defaultValue={rating}
								onChange={onChangeGeneric}
							>
								<option>Select...</option>
								<option value="G">G</option>
								<option value="PG">PG</option>
								<option value="PG-13">PG-13</option>
								<option value="R">R</option>
								<option value="Unrated">Unrated</option>
							</select>
						</div>

						<div className="form-group col-md-4">
							<label htmlFor="input_runtime">Runtime</label>
							<input
								type="text"
								className="form-control"
								id="input_runtime"
								defaultValue={runtime}
								onChange={onChangeGeneric}
							/>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-8">
							<label htmlFor="input_genre">Genre</label>
							<input
								type="text"
								className="form-control"
								id="input_genre"
								defaultValue={genre}
								onChange={onChangeGeneric}
							/>
						</div>

						<div className="form-group col-md-4">
							<label htmlFor="input_metacritic">Metacritic Score</label>
							<input
								type="text"
								className="form-control"
								id="input_metacritic"
								defaultValue={metacritic}
								onChange={onChangeGeneric}
							/>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="textarea_plot">Plot</label>
						<textarea
							className="form-control"
							id="textarea_plot"
							rows="4"
							defaultValue={plot}
							onChange={onChangeGeneric}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="input_director">Director(s)</label>
						<input
							type="text"
							className="form-control"
							id="input_director"
							defaultValue={director}
							onChange={onChangeGeneric}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="input_actors">Main Actor(s)</label>
						<input
							type="text"
							className="form-control"
							id="input_actors"
							defaultValue={actors}
							onChange={onChangeGeneric}
						/>
					</div>
				</div>

				<div className="form-row">
					<legend className="col-form-label">Format(s)</legend>

					<div className="form-group col-md-2">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								id="input_dvd"
								value="1"
								defaultChecked={formats.includes('1')}
								onChange={onChangeFormats}
							/>
							<label className="form-check-label" htmlFor="input_dvd">
								DVD
							</label>
						</div>
					</div>
					<div className="form-group col-md-2">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								id="input_bluray"
								value="2"
								defaultChecked={formats.includes('2')}
								onChange={onChangeFormats}
							/>
							<label className="form-check-label" htmlFor="input_bluray">
								Bluray
							</label>
						</div>
					</div>
					<div className="form-group col-md-2">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								id="input_4k"
								value="3"
								defaultChecked={formats.includes('3')}
								onChange={onChangeFormats}
							/>
							<label className="form-check-label" htmlFor="input_4k">
								4K Bluray
							</label>
						</div>
					</div>
					<div className="form-group col-md-2">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								id="input_digital"
								value="4"
								defaultChecked={formats.includes('4')}
								onChange={onChangeFormats}
							/>
							<label className="form-check-label" htmlFor="input_digital">
								Digital
							</label>
						</div>
					</div>
					<div className="form-group col-md-2">
						<div className="form-check form-check-inline">
							<input
								className="form-check-input"
								type="checkbox"
								id="input_streaming"
								value="5"
								defaultChecked={formats.includes('5')}
								onChange={onChangeFormats}
							/>
							<label className="form-check-label" htmlFor="input_streaming">
								Streaming
							</label>
						</div>
					</div>
				</div>

				<div className="form-row">
					<input type="submit" className="btn btn-primary" value="Update Movie" />
				</div>
			</form>
		</div>
	);
}
