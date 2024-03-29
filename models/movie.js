const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	username: { type: String, required: true },

	title: { type: String, required: true },
	year: { type: Number },
	rating: { type: String },
	runtime: { type: String },
	genre: { type: String },
	director: { type: String },
	actors: { type: Array },
	plot: { type: String },
	poster: { type: String },
	metacritic: { type: Number },

	seriesName: { type: String },
	seriesIndex: { type: Number },
	formats: { type: String },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
