const router = require('express').Router()
const dotenv = require('dotenv').config()  // Parses environment variables in .env file
const axios = require('axios')  // Promise-based HTTP client
const bcrypt = require('bcrypt')

let Movie = require('./models/movie')
let User = require('./models/user')


const omdbKey = 'a6ebd848'
const pwSaltRounds = 1


/**
 * POST '/api/users/create' - Creates a new user
 * req.body: { email, password }
 */
router.route('/users/create').post((req, res) => {
	const { email, password } = req.body

	// Attempt to find existing email
	User.find({ email })
		.then(results => {
			// If not found, create account
			if (results.length === 0) {
				bcrypt.hash(password, pwSaltRounds, (err, hash) => {
					const newUser = new User({ email, password: hash })
					newUser.save()
						.then(() => res.json(newUser))
						.catch(err => res.status(400).send('Database insert error: ' + err))
				})
			}
			else {
				res.status(409).send(`${email} is already taken`)
			}
		})
		.catch(err => res.status(400).send('Database find error: ' + err))
})


/**
 * GET '/api/users/login' - Verifies a user's credentials
 * req.body: { email, password }
 */
router.route('/users/login').post((req, res) => {
	const { email, password } = req.body

	// Attempt to find existing email
	User.find({ email })
		.then(results => {
			// If found, verify password
			if (results.length === 1) {  // Never > 1 because of unique email addresses
				bcrypt.compare(password, results[0].password, (err, result) => {
					if (result) {
						res.status(200).send('Password correct')
					}
					else {
						res.status(400).send('Password incorrect')
					}
				})
			}
			else {
				res.status(400).send('Email not found')
			}
		})
		.catch(err => res.status(400).send('Database find error: ' + err))
})


/**
 * GET '/api/omdb/:searchTerm' - Queries OMDb by search term
 * req.params: searchTerm
 */
router.route('/omdb/:searchTerm').get((req, res) => {
	const { searchTerm } = req.params
	const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbKey}&type=movie&s=${searchTerm}`

	axios.get(omdbUrl)
		.then(omdbResponse => {
			if (omdbResponse.status === 200) {
				if (omdbResponse.data.Response === 'True') {
					const movies = omdbResponse.data.Search.filter(movie => movie.Poster !== 'N/A')
					res.status(200).json(movies)
				}
				else {
					res.status(400).send(omdbResponse.data.Error)
				}
			}
			else {
				res.status(omdbResponse.status).send('Unknown OMDb error')
			}
		})
})


/**
 * POST '/api/movies' - Adds a new movie
 * Handles the OMDb API and calls addMovie()
 * req.body: { username, imdbId }
 */
router.route('/movies').post((req, res) => {
	const { username, imdbId } = req.body
	const omdbUrl = `http://www.omdbapi.com/?apikey=${omdbKey}&i=${imdbId}`

	axios.get(omdbUrl)
		.then(omdbResponse => {
			if (omdbResponse.status === 200) {
				if (omdbResponse.data.Response === 'True') {
					const newMovie = createMovie(username, omdbResponse.data)
					addMovie(newMovie, res)
				}
				else {
					res.status(400).send(omdbResponse.data.Error)
				}
			}
			else {
				res.status(omdbResponse.status).send('Unknown OMDb error')
			}
		})
})


/**
 * GET '/api/movies/:username' - Gets all movies for user
 * req.params: { username }
 */
router.route('/movies/:username').get((req, res) => {
	const { username } = req.params

	Movie.find({ username })
		.then(movies => res.json(movies))
		.catch(err => res.status(400).send('Error: ' + err))
})


/**
 * PUT '/api/movies' - Updates a movie
 * Replaces a movie object with a new one
 * req.body: { movieMongoId, movie }
 */
router.route('/movies').put((req, res) => {
	const { movieMongoId, movie } = req.body

	Movie.findByIdAndUpdate(movieMongoId, movie)
		.then(() => res.json(movie))
		.catch(err => res.status(400).send('Error: ' + err))
})


// DELETE '/api/movies' - Deletes all movies
/* router.route('/movies').delete((req, res) => {
	Movie.deleteMany({})
		.then(output => res.json(output))
		.catch(err => res.startus(400).send('Error: ' + err))
}) */


/**
 * DELETE '/api/movies' - Deletes a movie
 * req.body: { movieMongoId }
 */
router.route('/movies').delete((req, res) => {
	const { movieMongoId } = req.body
	console.log(movieMongoId)

	Movie.findByIdAndDelete(movieMongoId)
		.then(movie => res.json(movie))
		.catch(err => res.status(400).send('Error: ' + err))
})


/**
 * Creates a Movie based on custom data from the user and retrieved data from OMDb
 *
 * @param {object} omdbData OMDb data
 */
function createMovie(username, omdbData) {
	return new Movie({
		username,
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
		seriesName: '',
		seriesIndex: '',
		formats: ''
	})
}


/**
 * Checks if a movie already exists in the database then adds it
 *
 * @param {Movie object} newMovie The movie from OMDb
 * @param {HTTP object} res The HTTP response for sending data back
 */
function addMovie(newMovie, res) {
	Movie.find({ username: newMovie.username, title: newMovie.title })
		.then(results => {
			if (results.length === 0) {
				newMovie.save()
					.then(() => res.json(newMovie))
					.catch(err => res.status(400).send('Database insert error: ' + err))
			}
			else {
				res.status(400).send(`${newMovie.title} is already added`)
			}
		})
		.catch(err => res.status(400).send('Database find error: ' + err))
}


module.exports = router
