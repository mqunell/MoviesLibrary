const router = require('express').Router()
const dotenv = require('dotenv').config();  // Parses environment variables in .env file
const axios = require('axios')  // Promise-based HTTP client
let Movie = require('./models/movie')


// POST '/api/movies'
router.route('/movies').post((req, res) => {
	let omdbUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&t=${req.body.title}`
	if (req.body.year !== null) {
		omdbUrl += `&y=${req.body.year}`
	}

	axios
		.get(omdbUrl)
		.then(response => {
			const d = response.data
			const title = d.Title
			const year = d.Year
			const rating = d.Rated
			const runtime = d.Runtime
			const genre = d.Genre
			const actors = d.Actors.split(', ')

			const newMovie = new Movie({ title, year, rating, runtime, genre })
			newMovie.save()
				.then(() => res.send(newMovie))
				.catch(err => res.status(400).json('Error: ' + err))
		})
})


// GET '/api/movies'
router.route('/movies').get((req, res) => {
	Movie.find()
		.then(exercises => res.json(exercises))
		.catch(err => res.status(400).json('Error: ' + err))
})


// GET '/api/movies/:id'
router.route('/movies/:id').get((req, res) => {
})


// PUT '/api/movies/:id'
router.route('/movies/:id').put((req, res) => {
})


// DELETE '/api/movies/:id'
router.route('/movies/:id').delete((req, res) => {
})


module.exports = router
