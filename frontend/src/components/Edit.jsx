import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
	constructor(props) {
		super(props)
		this.state = props.location.movie
	}

	onChangeTitle = (e) => this.setState({ title: e.target.value })
	onChangeSeriesName = (e) => this.setState({ seriesName: e.target.value || null })
	onChangeSeriesIndex = (e) => this.setState({ seriesIndex: e.target.value || null })
	onChangeYear = (e) => this.setState({ year: e.target.value })
	onChangeRating = (e) => this.setState({ rating: e.target.value })
	onChangeRuntime = (e) => this.setState({ runtime: e.target.value })
	onChangeGenre = (e) => this.setState({ genre: e.target.value })
	onChangeMetacritic = (e) => this.setState({ metacritic: e.target.value })
	onChangePlot = (e) => this.setState({ plot: e.target.value })
	onChangeDirector = (e) => this.setState({ director: e.target.value })
	onChangeActors = (e) => this.setState({ actors: e.target.value })

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

		axios.put(`http://64.225.37.169:5050/api/movies/${this.state._id}`, movie)
			.then(response => console.log(response))  //todo
			.catch(error => console.log(error))  //todo
	}

	render() {
		// Props have to be passed differently when using a <Link>
		const { title, seriesName, seriesIndex, year, rating, runtime, genre, director, actors, plot, metacritic, formats } = this.state

		return (<div className="container-xl">
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<label htmlFor="inputTitle">Title</label>
					<input type="text" className="form-control" id="inputTitle" defaultValue={title} onChange={this.onChangeTitle}/>
				</div>

				<div className="form-row">
					<div className="form-group col-md-8">
						<label htmlFor="inputSeriesName">Series Name</label>
						<input type="text" className="form-control" id="inputSeriesName" defaultValue={seriesName} onChange={this.onChangeSeriesName}/>
					</div>

					<div className="form-group col-md-4">
						<label htmlFor="inputSeriesIndex">Series Index</label>
						<input type="text" className="form-control" id="inputSeriesIndex" defaultValue={seriesIndex} onChange={this.onChangeSeriesIndex}/>
					</div>
				</div>

				<div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label htmlFor="inputYear">Release Year</label>
							<input type="text" className="form-control" id="inputYear" defaultValue={year} onChange={this.onChangeYear}/>
						</div>

						<div className="form-group col-md-4">
							<label htmlFor="selectRating">Rating</label>
							<select className="custom-select" defaultValue={rating} onChange={this.onChangeRating}>
								<option>Select...</option>
								<option value="G">G</option>
								<option value="PG">PG</option>
								<option value="PG-13">PG-13</option>
								<option value="R">R</option>
								<option value="Unrated">Unrated</option>
							</select>
						</div>

						<div className="form-group col-md-4">
							<label htmlFor="inputRuntime">Runtime</label>
							<input type="text" className="form-control" id="inputRuntime" defaultValue={runtime} onChange={this.onChangeRuntime}/>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-8">
							<label htmlFor="inputGenre">Genre</label>
							<input type="text" className="form-control" id="inputGenre" defaultValue={genre} onChange={this.onChangeGenre}/>
						</div>

						<div className="form-group col-md-4">
							<label htmlFor="inputMetacritic">Metacritic Score</label>
							<input type="text" className="form-control" id="inputMetacritic" defaultValue={metacritic} onChange={this.onChangeMetacritic}/>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="textareaPlot">Plot</label>
						<textarea className="form-control" id="textareaPlot" rows="4" defaultValue={plot} onChange={this.onChangePlot}/>
					</div>

					<div className="form-group">
						<label htmlFor="inputDirector">Director(s)</label>
						<input type="text" className="form-control" id="inputDirector" defaultValue={director} onChange={this.onChangeDirector}/>
					</div>

					<div className="form-group">
						<label htmlFor="inputActors">Main Actor(s)</label>
						<input type="text" className="form-control" id="inputActors" defaultValue={actors} onChange={this.onChangeActors}/>
					</div>
				</div>

				<div className="form-row">
					<legend className="col-form-label">Format(s)</legend>

					<div className="form-group col-md-2">
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputDvd" value="1" defaultChecked={formats.includes('1')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="inputDvd">DVD</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputBluray" value="2" defaultChecked={formats.includes('2')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="inputBluray">Bluray</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="input4k" value="3" defaultChecked={formats.includes('3')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="input4k">4K Bluray</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputDigital" value="4" defaultChecked={formats.includes('4')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="inputDigital">Digital</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputStreaming" value="5" defaultChecked={formats.includes('5')} onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="inputStreaming">Streaming</label>
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
