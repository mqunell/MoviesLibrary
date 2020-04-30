import React, { Component } from 'react'
import axios from 'axios'  // Promise-based HTTP client


export default class Add extends Component {
	state = {
		title: '',
		year: '',
		seriesName: '',
		seriesIndex: 0,
		formats: ''
	}

	onChangeTitle = (e) => {
		this.setState({ title: e.target.value})
	}

	onChangeYear = (e) => {
		this.setState({ year: e.target.value })
	}

	onChangeSeriesName = (e) => {
		this.setState({ seriesName: e.target.value })
	}

	onChangeSeriesIndex = (e) => {
		this.setState({ seriesIndex: e.target.value })
	}

	onChangeFormats = (e) => {
		const formatNum = e.target.value

		const newFormats = (this.state.formats.includes(formatNum))
			? this.state.formats.replace(formatNum, '')
			: this.state.formats + formatNum

		this.setState({ formats: newFormats })
	}

	onSubmit = (e) => {
		// Prevent default HTML form submit event
		e.preventDefault()

		const movie = {
			title: this.state.title,
			year: this.state.year,
			seriesName: this.state.seriesName || null,
			seriesIndex: this.state.seriesIndex || null,
			formats: this.state.formats
		}

		const alert = document.getElementById('alert')
		alert.innerHTML = 'Adding movie...'
		alert.classList = 'alert alert-info show_alert'

		// Send movie data to backend
		axios.post('http://localhost:5050/api/movies', movie)
			.then(response => {
				if (response.status === 200) {
					alert.innerHTML = 'Movie added'
					alert.classList = 'alert alert-success show_alert'
				}
				else {
					alert.innerHTML = 'Unknown error'
					alert.classList = 'alert alert-danger show_alert'
				}

				setTimeout(() => { alert.classList = 'alert' }, 3000)
			})
	}

	render() {
		return (<>
			<form onSubmit={this.onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-8">
						<label htmlFor="inputTitle">Title</label>
						<input type="text" className="form-control" id="inputTitle" placeholder="Avengers: Infinity War"
							onChange={this.onChangeTitle}/>
					</div>

					<div className="form-group col-md-4">
						<label htmlFor="inputYear">Release Year (optional)</label>
						<input type="text" className="form-control" id="inputYear" placeholder="2018"
							onChange={this.onChangeYear}/>
					</div>
				</div>

				<div className="form-row">
					<div className="form-group col-md-8">
						<label htmlFor="inputSeriesName">Series Name</label>
						<input type="text" className="form-control" id="inputSeriesName" placeholder="Marvel Cinematic Universe"
							onChange={this.onChangeSeriesName}/>
					</div>

					<div className="form-group col-md-4">
						<label htmlFor="inputSeriesIndex">Number in Series</label>
						<input type="text" className="form-control" id="inputSeriesIndex" placeholder="19"
							onChange={this.onChangeSeriesIndex}/>
					</div>
				</div>

				<div className="form-row">
					<legend className="col-form-label">Format(s)</legend>

					<div className="form-group col-md-2">
						<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputDvd" value="1"
								onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="inputDvd">DVD</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputBluray" value="2"
								onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="inputBluray">Bluray</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="input4k" value="3"
								onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="input4k">4K Bluray</label>
						</div>
					</div>
					<div className="form-group col-md-2">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputDigital" value="4"
								onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="inputDigital">Digital</label>
						</div>
					</div>
					<div className="form-group col-md-4">
							<div className="form-check form-check-inline">
							<input className="form-check-input" type="checkbox" id="inputStreaming" value="5"
								onChange={this.onChangeFormats}/>
							<label className="form-check-label" htmlFor="inputStreaming">Streaming Service</label>
						</div>
					</div>
				</div>

				<div className="form-row">
					<input type="submit" className="btn btn-primary" value="Fetch Movie Data"/>
				</div>
			</form>

			<div id="alert" className="alert" role="alert">
				Success alert test
			</div>
		</>)
	}
}
