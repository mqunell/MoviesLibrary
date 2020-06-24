const router = require('express').Router()
const dotenv = require('dotenv').config();  // Parses environment variables in .env file
const axios = require('axios')  // Promise-based HTTP client
let Movie = require('./models/movie')


/**
 * POST '/api/movies' - Adds a new movie
 * Handles the OMDb API and calls addMovie()
 */
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
					addMovie(newMovie, res)
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
	Movie.findById(req.params.id)
		.then(movie => res.json(movie))
		.catch(err => res.status(400).json('Error: ' + err))
})


// PUT '/api/movies/:id'
router.route('/movies/:id').put((req, res) => {
	// req.params.id: ._id, req.body: movie
	Movie.findByIdAndUpdate(req.params.id, req.body)
		.then(console.log('success'))  //todo
		.catch(err => console.log(err))  //todo
})


// DELETE '/api/movies' - Deletes all movies
router.route('/movies').delete((req, res) => {
	Movie.deleteMany({})
		.then(output => res.json(output))
		.catch(err => res.startus(400).json('Error: ' + err))
})


// DELETE '/api/movies/:id'
router.route('/movies/:id').delete((req, res) => {
	Movie.findByIdAndDelete(req.params.id)
		.then(movie => res.json(movie))
		.catch(err => res.status(400).json('Error: ' + err))
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


/**
 * Checks if a movie already exists in the database then adds it
 *
 * @param {Movie object} newMovie The movie from OMDb
 * @param {HTTP object} res The HTTP response for sending data back
 */
function addMovie(newMovie, res) {
	Movie.find({ title: newMovie.title })
		.then(results => {
			if (results.length == 0) {
				newMovie.save()
					.then(() => res.send(newMovie))
					.catch(err => res.status(400).json('Database error: ' + err))
			}
			else {
				res.status(400).send(`${newMovie.title} is already added`)
			}
		})
		.catch(error => res.status(400).send('Error while checking database: ' + err))
}


module.exports = router
