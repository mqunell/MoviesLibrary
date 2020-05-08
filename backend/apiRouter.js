const router = require('express').Router()
const dotenv = require('dotenv').config();  // Parses environment variables in .env file
const axios = require('axios')  // Promise-based HTTP client
let Movie = require('./models/movie')


// POST '/api/movies' - Adds a new movie
router.route('/movies').post((req, res) => {
	let omdbUrl = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&t=${req.body.title}`
	if (req.body.year !== null) {
		omdbUrl += `&y=${req.body.year}`
	}

	axios.get(omdbUrl)
		.then(omdbResponse => {
			if (omdbResponse.status === 200) {
				if (omdbResponse.data.Response === 'True') {
					const newMovie = createMovie(req.body, omdbResponse.data)

					newMovie.save()
						.then(() => res.send(newMovie))
						.catch(err => res.status(400).json('MongoDB error: ' + err))
				}
				else {
					res.status(400).send(omdbResponse.data.Error)
				}
			}
			else {
				res.status(omdbResponse.status).json('Unknown OMDb error')
			}
		})
})


// GET '/api/movies' - Gets all movies
router.route('/movies').get((req, res) => {
	Movie.find()
		.then(movies => res.json(movies))
		.catch(err => res.status(400).json('Error: ' + err))
})


// GET '/api/movies/:id'
router.route('/movies/:id').get((req, res) => {
})


// PUT '/api/movies/:id'
router.route('/movies/:id').put((req, res) => {
})


// DELETE '/api/movies' - Deletes all movies
router.route('/movies').delete((req, res) => {
	console.log('here')

	Movie.deleteMany({})
		.then(output => res.json(output))
		.catch(err => res.startus(400).json('Error: ' + err))
})


// DELETE '/api/movies/:id'
router.route('/movies/:id').delete((req, res) => {
})


/**
 * Creates a Movie based on custom data from the user and retrieved data from OMDb
 *
 * @param {object} userData User-submitted data
 * @param {object} omdbData OMDb data
 */
function createMovie(userData, omdbData) {
	return new Movie({
		title: omdbData.Title,
		year: omdbData.Year,
		rating: omdbData.Rated,
		runtime: omdbData.Runtime,
		genre: omdbData.Genre,
		director: omdbData.Director,
		actors: omdbData.Actors,
		plot: omdbData.Plot,
		poster: omdbData.Poster,
		metacritic: omdbData.Metascore,
		seriesName: userData.seriesName,
		seriesIndex: userData.seriesIndex,
		formats: userData.formats
	})
}

module.exports = router
