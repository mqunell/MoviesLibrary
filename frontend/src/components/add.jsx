import React, { Component } from 'react'
import axios from 'axios'  // Promise-based HTTP client


export default class Add extends Component {
	state = {
		title: '',
		year: ''
	}

	onChangeTitle = (e) => {
		this.setState({ title: e.target.value})
	}

	onChangeYear = (e) => {
		this.setState({ year: e.target.value })
	}

	onSubmit = (e) => {
		// Prevent default HTML form submit event
		e.preventDefault()

		const movie = {
			title: this.state.title,
			year: this.state.year
		}
		// seriesName: this.state.seriesName || null

		// Send movie data to backend
		axios
			.post('http://localhost:5050/api/movies', movie)
			.then(response => {
				console.log(response)
			})
	}

	render() {
		return (<>
			<form onSubmit={this.onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-8">
						<label htmlFor="inputTitle">Title</label>
						<input type="text" className="form-control" id="inputTitle" placeholder="Avengers: Infinity War" onChange={this.onChangeTitle}/>
					</div>

					<div className="form-group col-md-4">
						<label htmlFor="inputYear">Release Year (optional)</label>
						<input type="text" className="form-control" id="inputYear" placeholder="2018" onChange={this.onChangeYear}/>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-8">
						<label htmlFor="inputSeriesName">Series Name</label>
						<input type="text" className="form-control" id="inputSeriesName" placeholder="Marvel Cinematic Universe"/>
					</div>

					<div className="form-group col-md-4">
						<label htmlFor="inputSeriesIndex">Number in Series</label>
						<input type="text" className="form-control" id="inputSeriesIndex" placeholder="19"/>
					</div>
				</div>

				<div className="form-row">
					<legend className="col-form-label">Format(s)</legend>

					<div className="form-group col-md-2">
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputDvd" value="format1"/>
							<label className="form-check-label" htmlFor="inputDvd">DVD</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputBluray" value="format2"/>
							<label className="form-check-label" htmlFor="inputBluray">Bluray</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="input4k" value="format3"/>
							<label className="form-check-label" htmlFor="input4k">4K Bluray</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputDigital" value="format4"/>
							<label className="form-check-label" htmlFor="inputDigital">Digital</label>
						</div>
					</div>
					<div className="form-group col-md-4">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputStreaming" value="format5"/>
							<label className="form-check-label" htmlFor="inputStreaming">Streaming Service</label>
						</div>
					</div>
				</div>

				<div className="form-group">
					<input type="submit" className="btn btn-primary" value="Fetch Movie Data"/>
				</div>
			</form>
		</>)
	}
}
