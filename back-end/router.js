const express = require('express');
const router = express.Router();
const index = require('./controllers/movies');
// const getMovie_id = require('./controllers/movies_id');
const Movie = require('./models/movie');

router.get('/movies', index, async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/movies/:id', getMovie, (req, res) => {
    res.json(res.movie)
});

router.post('/movies', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        poster: req.body.poster,
        genre: req.body.genre
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});


router.patch('/movies/:id', getMovie, async (req, res) => {
    if (req.body.title != null) {
        res.movie.title = req.body.title
    }

    if (req.body.poster != null) {
        res.movie.poster = req.body.poster
    }

    if (req.body.genre != null) {
        res.movie.genre = req.body.genre
    }
    try {
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie)
    } catch {
        res.status(400).json({ message: err.message })
    }

});


router.delete('/movies/:id', getMovie, async (req, res) => {
    try {
        await res.movie.remove();
        res.json({ message: 'Movie deletnulsa' })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});


async function getMovie(req, res, next) {
    try {
        movie = await Movie.findById(req.params.id);
        if (movie == null) {
            return res.status(404).json({ message: 'Cant find this Movie'})
        }
    } catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.movie = movie;
    next()
}



// router.route('/movies.json').get(index);

// export default router
module.exports = router;