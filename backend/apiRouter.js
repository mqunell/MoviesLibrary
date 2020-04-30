const router = require('express').Router()
const dotenv = require('dotenv').config();  // Parses environment variables in .env file
const axios = require('axios')  // Promise-based HTTP client
let Movie = require('./models/movie')


// POST '/api/movies'
router.route('/movies').post((req, res) => {
	// User data
	const { title } = req.body
	const { year } = req.body
	const { seriesName } = req.body
	const { seriesIndex } = req.body
	const { formats } = req.body

	let omdbUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&t=${title}`
	if (year !== null) {
		omdbUrl += `&y=${year}`
	}

	axios.get(omdbUrl)
		.then(response => {
			const d = response.data

			const newMovie = new Movie({
				title: d.Title,
				year: d.Year,
				rating: d.Rated,
				runtime: d.Runtime,
				genre: d.Genre,
				director: d.Director,
				actors: d.Actors,
				plot: d.Plot,
				poster: d.Poster,
				metacritic: d.Metascore,
				seriesName,
				seriesIndex,
				formats
			})

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
