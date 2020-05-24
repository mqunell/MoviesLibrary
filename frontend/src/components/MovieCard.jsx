import React, { Component } from 'react';

const MovieFormatItem = props => (
	<div className={'format_item format_' + props.data.formatString.toLowerCase() + (props.data.hasFormat ? ' has_format' : '')}>
		<i className={'fas fa-' + props.data.formatIcon}></i>
		<p>{props.data.formatString}</p>
	</div>
)

export default class MovieCard extends Component {
	render() {
		const { poster, title, year, rating, runtime, metacritic, plot, formats } = this.props.movie

		return (
			<div className="movie_card" onClick={() => {this.props.showModal(this.props.movie)}}>
				<img className="movie_card_image" src={poster} alt="Cover art"/>
				<div className="movie_card_details">
					<div className="movie_card_details_line">
						<p>{title.length > 40 ? title.slice(0, 40) + '...' : title}</p>
						<p>{year}</p>
					</div>

					<div className="movie_card_details_line">
						<p>{rating}</p>
						<p>{runtime}</p>
						<p>{metacritic}/100</p>
					</div>

					<p>{plot}</p>

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
		);
	}
}
