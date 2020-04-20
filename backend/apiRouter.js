const router = require('express').Router();


// GET '/api/movies'
router.route('/').get((req, res) => {
	res.send('Hello world!');
	console.log('GET tracked');
});


module.exports = router;
