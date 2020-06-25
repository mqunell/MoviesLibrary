import React, { Component } from 'react'
import axios from 'axios'  // Promise-based HTTP client


const FormatCheckbox = props => (
	<div className={'form-group col-md-' + props.width}>
		<div className="form-check form-check-inline">
			<input className="form-check-input" type="checkbox" id={props.id} value={props.value}
				onChange={props.onChange}/>
			<label className="form-check-label" htmlFor={props.id}>{props.text}</label>
		</div>
	</div>
)


export default class Add extends Component {
	state = {
		title: '',
		year: '',
		seriesName: '',
		seriesIndex: '',
		formats: '',
		alertText: '',
		alertClasses: 'alert'
	}

	onChangeTitle = (e) => this.setState({ title: e.target.value})
	onChangeYear = (e) => this.setState({ year: e.target.value })
	onChangeSeriesName = (e) => this.setState({ seriesName: e.target.value })
	onChangeSeriesIndex = (e) => this.setState({ seriesIndex: e.target.value })

	onChangeFormats = (e) => {
		const formatNum = e.target.value
		const currentFormats = this.state.formats

		const newFormats = (currentFormats.includes(formatNum))
			? currentFormats.replace(formatNum, '')
			: currentFormats + formatNum

		this.setState({ formats: newFormats })
	}

	onSubmit = (e) => {
		// Prevent default HTML form submit event
		e.preventDefault()

		const { title, year, seriesName, seriesIndex, formats } = this.state
		const movie = { title, year, seriesName, seriesIndex, formats }

		this.showAlert('Adding movie...', 'info', false)

		// Send movie data to backend
		axios.post('http://localhost:5050/api/movies', movie)
			.then(response => {
				this.showAlert(`${response.data.title} added`, 'success', true)
			})
			.catch(error => {
				this.showAlert(`Error: ${error.response ? error.response.data : 'Could not connect to server'}`, 'danger', true)
			})
	}

	/**
	 * Helper function for creating Bootstrap alerts
	 * @param {string} text The text to show in the alert
	 * @param {string} type The type of Bootstrap alert (primary, success, danger, info, etc)
	 * @param {boolean} autoHide Automatically hide the alert or not
	 */
	showAlert(text, type, autoHide) {
		this.setState({
			alertText: text,
			alertClasses: `alert alert-${type} show_alert`
		})

		if (autoHide) {
			setTimeout(() => {this.setState({ alertClasses: 'alert' })}, 3000)
		}
	}

	render() {
		return (<div className="container-xl">
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

					<FormatCheckbox
						id="inputDvd"
						text="DVD"
						value="1"
						width="2"
						onChange={this.onChangeFormats}
					/>
					<FormatCheckbox
						id="inputBluray"
						text="Bluray"
						value="2"
						width="2"
						onChange={this.onChangeFormats}
					/>
					<FormatCheckbox
						id="input4k"
						text="4K Bluray"
						value="3"
						width="2"
						onChange={this.onChangeFormats}
					/>
					<FormatCheckbox
						id="inputDigital"
						text="Digital"
						value="4"
						width="2"
						onChange={this.onChangeFormats}
					/>
					<FormatCheckbox
						id="inputStreaming"
						text="Streaming Service"
						value="5"
						width="4"
						onChange={this.onChangeFormats}
					/>
				</div>

				<div className="form-row">
					<input type="submit" className="btn btn-primary" value="Fetch Movie Data"/>
				</div>
			</form>

			<div id="alert" className={this.state.alertClasses} role="alert">
				{this.state.alertText}
			</div>
		</div>)
	}
}
