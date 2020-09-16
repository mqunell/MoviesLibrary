const express = require('express')
const cors = require('cors')  // Allows AJAX requests to skip the same-origin policy
const dotenv = require('dotenv').config()  // Parses environment variables in .env file
const mongoose = require('mongoose')  // Helps connect to MongoDB database
const path = require('path')


// Env variables
const { EXPRESS_PORT, MONGO_URI, NODE_ENV } = process.env


// Create the Express app and add middleware
const app = express()
app.use(cors())
app.use(express.json())  // Enable JSON parsing


// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
	console.log('MongoDB Atlas database connection established')
})


// Require the routes file and forward "<root url>/api" requests
const apiRouter = require('./apiRouter')
app.use('/api', apiRouter)


if (NODE_ENV === 'production' || NODE_ENV === 'staging') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'))
	})
}


// Start the Express server
const port = EXPRESS_PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}...`))
