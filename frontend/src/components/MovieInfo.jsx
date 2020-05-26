import React, { Component } from 'react'

const MovieFormatItem = props => (
	<div className={'format_item format_' + props.data.formatString.toLowerCase() + (props.data.hasFormat ? ' has_format' : '')}>
		<i className={'fas fa-' + props.data.formatIcon}></i>
		<p>{props.data.formatString}</p>
	</div>
)

export default class MovieInfo extends Component {
	render() {
		const { title, year, rating, runtime, genre, director, actors, plot, poster, metacritic, seriesName, seriesIndex, formats } = this.props.movie

		return (
			<div className="movie_info">
				<div className="modal_text_col">
					<p className="modal_title">{title}</p>
					<p className="modal_series">{(seriesName !== null ? seriesName + ' #' + seriesIndex : '')}</p>
				</div>
				<div className="modal_text_row">
					<div><i className="far fa-calendar-alt"></i><p>{year}</p></div>
					<div><i className="fas fa-users"></i><p>{rating}</p></div>
					<div><i className="far fa-clock"></i><p>{runtime}</p></div>
					<div className="modal_only"><i className="far fa-star"></i><p>{metacritic}/100</p></div>
				</div>
				<div className="modal_text_col modal_only">
					<p>Genre</p>
					<p>{genre}</p>
				</div>
				<div className="modal_text_col modal_only">
					<p>Plot</p>
					<p>{plot}</p>
				</div>
				<div className="modal_text_col modal_only">
					<p>Director</p>
					<p>{director}</p>
				</div>
				<div className="modal_text_col modal_only">
					<p>Cast</p>
					<p>{actors}</p>
				</div>

				<div className="modal_text_col">
					<p className="modal_only">Formats</p>
					<div className="formats_container">
						<MovieFormatItem data={{
							formatString: 'DVD',
							hasFormat: formats.includes('1'),
							formatIcon: 'compact-disc'
						}}/>

						<MovieFormatItem data={{
							formatString: 'Bluray',
							hasFormat: formats.includes('2'),
							formatIcon: 'compact-disc'
						}}/>

						<MovieFormatItem data={{
							formatString: '4K',
							hasFormat: formats.includes('3'),
							formatIcon: 'compact-disc'
						}}/>

						<MovieFormatItem data={{
							formatString: 'Digital',
							hasFormat: formats.includes('4'),
							formatIcon: 'hdd'
						}}/>

						<MovieFormatItem data={{
							formatString: 'Stream',
							hasFormat: formats.includes('5'),
							formatIcon: 'cloud'
						}}/>
					</div>
				</div>
			</div>
		)
	}
}
