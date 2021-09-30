const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// .env variables and Heroku PORT
const { MONGO_URI, NODE_ENV, PORT } = process.env;

// Create the Express app and add middleware
const app = express();
app.use(cors());
app.use(express.json()); // Parse req.body JSON

// Connect to MongoDB Atlas
mongoose.connection.once('open', () => {
	console.log('MongoDB Atlas connection established');
});

mongoose.connect(MONGO_URI);

// Connect the routers
app.use('/api', require('./apiRouter'));

// Serve the frontend
if (NODE_ENV === 'production' || NODE_ENV === 'staging') {
	app.use(express.static('../client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	});
}

// Start the server
const port = PORT || 5050;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
