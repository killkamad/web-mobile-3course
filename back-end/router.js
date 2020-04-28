const express = require('express');
const router = express.Router();

const index = require('./controllers/movies');

router.route('/movies').get(index);

module.exports = router;