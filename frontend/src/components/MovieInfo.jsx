import React, { Component } from 'react'

const MovieFormatItem = props => (
	<div className={'format_item format_' + props.formatString.toLowerCase() + (props.hasFormat ? ' has_format' : '')}>
		<i className={'fas fa-' + props.formatIcon}></i>
		<p>{props.formatString}</p>
	</div>
)

export default class MovieInfo extends Component {
	render() {
		const { title, year, rating, runtime, genre, director, actors, plot, metacritic, seriesName, seriesIndex, formats } = this.props.movie

		return (
			<div className="movie_info">
				<div className="movie_info_col">
					<p className="movie_info_title">{title}</p>
					<p className="movie_info_series">{(seriesName !== null ? seriesName + ' #' + seriesIndex : '')}</p>
				</div>
				<div className="movie_info_row">
					<div><i className="far fa-calendar-alt"></i><p>{year}</p></div>
					<div><i className="fas fa-users"></i><p>{rating}</p></div>
					<div><i className="far fa-clock"></i><p>{runtime}</p></div>
					<div className="modal_only"><i className="far fa-star"></i><p>{metacritic}/100</p></div>
				</div>
				<div className="movie_info_col modal_only">
					<p>Genre</p>
					<p>{genre}</p>
				</div>
				<div className="movie_info_col modal_only">
					<p>Plot</p>
					<p>{plot}</p>
				</div>
				<div className="movie_info_col modal_only">
					<p>Director</p>
					<p>{director}</p>
				</div>
				<div className="movie_info_col modal_only">
					<p>Cast</p>
					<p>{actors}</p>
				</div>

				<div className="movie_info_col">
					<p className="modal_only">Formats</p>
					<div className="formats_container">
						<MovieFormatItem
							formatString="DVD"
							hasFormat={formats.includes('1')}
							formatIcon='compact-disc'
						/>

						<MovieFormatItem
							formatString="Bluray"
							hasFormat={formats.includes('2')}
							formatIcon="compact-disc"
						/>

						<MovieFormatItem
							formatString="4K"
							hasFormat={formats.includes('3')}
							formatIcon="compact-disc"
						/>

						<MovieFormatItem
							formatString="Digital"
							hasFormat={formats.includes('4')}
							formatIcon="hdd"
						/>

						<MovieFormatItem
							formatString="Stream"
							hasFormat={formats.includes('5')}
							formatIcon="cloud"
						/>
					</div>
				</div>
			</div>
		)
	}
}
