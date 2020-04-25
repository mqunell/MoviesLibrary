const router = require('express').Router();


// POST '/api/movies'
router.route('/movies').post((req, res) => {
});


// GET '/api/movies'
router.route('/movies').get((req, res) => {
	res.send(`GET /api/movies`);
});


// GET '/api/movies/:id'
router.route('/movies/:id').get((req, res) => {
});


// PUT '/api/movies/:id'
router.route('/movies/:id').put((req, res) => {
});


// DELETE '/api/movies/:id'
router.route('/movies/:id').delete((req, res) => {
});


module.exports = router;
