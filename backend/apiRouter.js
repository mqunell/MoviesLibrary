const router = require('express').Router()
const dotenv = require('dotenv').config()  // Parses environment variables in .env file
const axios = require('axios')  // Promise-based HTTP client
let Movie = require('./models/movie')
let User = require('./models/user')


/**
 * POST '/api/users/create' - Creates a new user
 */
router.route('/users/create').post((req, res) => {
	console.log(req.body)
	const { email, password } = req.body

	// Attempt to find existing email
	User.find({ email })
		.then(results => {
			// If not found, create account
			if (results.length === 0) {
				const newUser = new User({ email, password })
				newUser.save()
					.then(() => res.json(newUser))
					.catch(err => res.status(400).send('Database insert error: ' + err))
			}
			else {
				res.status(409).send(`${email} is already taken`)
			}
		})
		.catch(err => res.status(400).send('Database find error: ' + err))
})


/**
 * POST '/api/users/login' - Verifies a user's credentials
 */
router.route('/users/login').post((req, res) => {
	console.log(req.body)
	const { email, password } = req.body

	// Attempt to find existing email
	User.find({ email })
		.then(results => {
			// If found, verify password
			if (results.length === 1) {  // Never > 1 because of unique email addresses
				if (password === results[0].password) {
					res.status(200).send('Password match')
				}
				else {
					res.status(400).send('Password incorrect')
				}
			}
			else {
				res.status(400).send('Email not found')
			}
		})
		.catch(err => res.status(400).send('Database find error: ' + err))
})


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
				res.status(omdbResponse.status).send('Unknown OMDb error')
			}
		})
})


// GET '/api/movies' - Gets all movies
router.route('/movies').get((req, res) => {
	Movie.find()
		.then(movies => res.cookie('cookieName', 'cookieValue').json(movies))  // Test cookie
		.catch(err => res.status(400).send('Error: ' + err))
})


// GET '/api/movies/:id'
router.route('/movies/:id').get((req, res) => {
	Movie.findById(req.params.id)
		.then(movie => res.json(movie))
		.catch(err => res.status(400).send('Error: ' + err))
})


// PUT '/api/movies/:id'
router.route('/movies/:id').put((req, res) => {
	const movieId = req.params.id
	const movie = req.body

	Movie.findByIdAndUpdate(movieId, movie)
		.then(() => res.json(movie))
		.catch(err => res.status(400).send('Error: ' + err))
})


// DELETE '/api/movies' - Deletes all movies
router.route('/movies').delete((req, res) => {
	Movie.deleteMany({})
		.then(output => res.json(output))
		.catch(err => res.startus(400).send('Error: ' + err))
})


// DELETE '/api/movies/:id'
router.route('/movies/:id').delete((req, res) => {
	Movie.findByIdAndDelete(req.params.id)
		.then(movie => res.json(movie))
		.catch(err => res.status(400).send('Error: ' + err))
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
