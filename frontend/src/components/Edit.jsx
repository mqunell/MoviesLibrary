import React, { Component } from 'react'
import axios from 'axios'
import Alert from './Alert.js'


export default class Edit extends Component {
	constructor(props) {
		super(props)
		this.state = props.location.movie
	}

	onChangeGeneric = (e) => {
		const element = e.target

		const key = element.id.substr(element.id.indexOf('_') + 1)
		const val = element.value

		this.setState({ [key]: val })
	}

	onChangeFormats = (e) => {
		const formatNum = e.target.value
		const currentFormats = this.state.formats

		const newFormats = (currentFormats.includes(formatNum))
			? currentFormats.replace(formatNum, '')
			: currentFormats + formatNum

		this.setState({ formats: newFormats })
	}

	onSubmit = (e) => {
		e.preventDefault()

		const { title, seriesName, seriesIndex, year, rating, runtime, genre, metacritic, plot, director, actors, formats } = this.state
		const movie = { title, seriesName, seriesIndex, year, rating, runtime, genre, metacritic, plot, director, actors, formats }

		axios.put(`http://localhost:5050/api/movies/${this.state._id}`, movie)
			.then(response => {
				Alert.get().show(`${response.data.title} updated`, 'success', true)
			})
			.catch(error => {
				Alert.get().show(`Error: ${error.reponse ? error.response.data : 'Unknown error'}`, 'danger', true)
			})
	}

	render() {
		// Props have to be passed differently when using a <Link>
		const { title, seriesName, seriesIndex, year, rating, runtime, genre, director, actors, plot, metacritic, formats } = this.state

		return (<div className="container-xl">
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<label htmlFor="input_title">Title</label>
					<input type="text" className="form-control" id="input_title" defaultValue={title} onChange={this.onChangeGeneric}/>
				</div>

				<div className="form-row">
					<div className="form-group col-md-8">
						<label htmlFor="input_seriesName">Series Name</label>
						<input type="text" className="form-control" id="input_seriesName" defaultValue={seriesName} onChange={this.onChangeGeneric}/>
					</div>

					<div className="form-group col-md-4">
						<label htmlFor="input_seriesIndex">Series Index</label>
						<input type="text" className="form-control" id="input_seriesIndex" defaultValue={seriesIndex} onChange={this.onChangeGeneric}/>
					</div>
				</div>

				<div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label htmlFor="input_year">Release Year</label>
							<input type="text" className="form-control" id="input_year" defaultValue={year} onChange={this.onChangeGeneric}/>
						</div>

						<div className="form-group col-md-4">
							<label htmlFor="select_rating">Rating</label>
							<select className="custom-select" id="select_rating" defaultValue={rating} onChange={this.onChangeGeneric}>
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
							<input type="text" className="form-control" id="input_runtime" defaultValue={runtime} onChange={this.onChangeGeneric}/>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-8">
							<label htmlFor="input_genre">Genre</label>
							<input type="text" className="form-control" id="input_genre" defaultValue={genre} onChange={this.onChangeGeneric}/>
						</div>

						<div className="form-group col-md-4">
							<label htmlFor="input_metacritic">Metacritic Score</label>
							<input type="text" className="form-control" id="input_metacritic" defaultValue={metacritic} onChange={this.onChangeGeneric}/>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="textarea_plot">Plot</label>
						<textarea className="form-control" id="textarea_plot" rows="4" defaultValue={plot} onChange={this.onChangeGeneric}/>
					</div>

					<div className="form-group">
						<label htmlFor="input_director">Director(s)</label>
						<input type="text" className="form-control" id="input_director" defaultValue={director} onChange={this.onChangeGeneric}/>
					</div>

					<div className="form-group">
						<label htmlFor="input_actors">Main Actor(s)</label>
						<input type="text" className="form-control" id="input_actors" defaultValue={actors} onChange={this.onChangeGeneric}/>
					</div>
				</div>

				<div className="form-row">
					<legend className="col-form-label">Format(s)</legend>

					<div className="form-group col-md-2">
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="input_dvd" value="1" defaultChecked={formats.includes('1')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="input_dvd">DVD</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="input_bluray" value="2" defaultChecked={formats.includes('2')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="input_bluray">Bluray</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="input_4k" value="3" defaultChecked={formats.includes('3')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="input_4k">4K Bluray</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="input_digital" value="4" defaultChecked={formats.includes('4')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="input_digital">Digital</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="input_streaming" value="5" defaultChecked={formats.includes('5')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="input_streaming">Streaming</label>
						</div>
					</div>
				</div>

				<div className="form-row">
					<input type="submit" className="btn btn-primary" value="Update Movie"/>
				</div>
			</form>
		</div>)
	}
}
